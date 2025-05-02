import { useEffect, useRef, useState } from "react";
import { Card, Container, Breadcrumb } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router"; // Import useNavigate
import LocationsService, { ILocation } from "../../services/LocationsService";
import Button from "../../components/input/Button";
import { useDialog } from "../../providers/DialogProvider";
import { Types } from "mongoose";
import LocationForm, { ILocationFormRef, LocationFormValues } from "../../forms/LocationForm";
import { PencilFill, TrashFill } from "react-bootstrap-icons";

function LocationsPage() {
  const { showDialog, showErrorDialog } = useDialog();
  const urlLocation = useLocation();
  const navigate = useNavigate();
  const [childLocations, setChildLocations]: [ILocation[], any] = useState([]);
  const [currentLocation, setCurrentLocation]: [ILocation | any, any] =
    useState(null);

  const locationFormRef = useRef<ILocationFormRef>(null);

  const fetchLocations = async () => {
    try {
      const queryParams = new URLSearchParams(urlLocation.search);
      const currentLocationId = queryParams.get("root");

      if (currentLocationId && currentLocationId !== "none") {
        const currentLocationFetched = await LocationsService.getLocationById(
          new Types.ObjectId(currentLocationId),
          { path: true }
        );
        setCurrentLocation(currentLocationFetched);
      } else {
        setCurrentLocation(null);
      }

      const childLocationsFetched = await LocationsService.getLocations({
        parent: currentLocationId ?? "none",
      });
      setChildLocations(childLocationsFetched);
    } catch (e) {
      showErrorDialog(e);
    }
  };

  const gotoLocation = (id: string) => {
    const queryParams = new URLSearchParams(urlLocation.search);
    queryParams.set("root", id);
    navigate(`${urlLocation.pathname}?${queryParams.toString()}`);
  };

  const deleteLocation = (location: ILocation) => {
    // The delete action itself
    const handleDelete = async (location: ILocation) => {
      try {
        await LocationsService.deleteLocation(location._id);
        setChildLocations((prev: ILocation[]) =>
          prev.filter((loc: ILocation) => loc._id !== location._id)
        );
      } catch (e) {
        showErrorDialog(e);
      }
    };

    showDialog({
      content: (
        <p>
          Jste si jisti, že chcete odstranit lokaci{" "}
          <strong>{location.title}</strong>?
        </p>
      ),
      buttons: [
        {
          label: "Odstranit",
          action: () => handleDelete(location),
          variant: "danger",
        },
        { label: "Zrušit", action: () => {}, variant: "secondary" },
      ],
    });
  };

  const createLocation = () => {
    const handleSubmit = async (newLocation: LocationFormValues) => {
      if (currentLocation !== null) {
        newLocation.parent = currentLocation._id;
      }
      try {
        const createdLocation = await LocationsService.createLocation(newLocation);
        setChildLocations((prev: ILocation[]) => [...prev, createdLocation]);

      } catch (e: any) {
        showErrorDialog(e);
      }
    };

    showDialog({
      title: "Nová lokace",
      content: (
        <LocationForm
          ref={locationFormRef}
          onSubmit={handleSubmit}
          initialValues={new LocationFormValues()}
        />
      ),
      buttons: [
        {label: "Vytvořit", variant: "primary", action: () => locationFormRef.current?.submitForm?.()},
        {label: "Zrušit", variant: "secondary", action: () => {}},
      ]
    });
  };

  useEffect(() => {
    fetchLocations();
  }, [urlLocation.search]);

  return (
    <Container>
      <h1>Lokace</h1>

      <Breadcrumb>
        <Breadcrumb.Item
          key="none"
          active={currentLocation === null}
          onClick={() => gotoLocation("none")}
        >
          Domů
        </Breadcrumb.Item>
        {currentLocation !== null && (
          <>
            {currentLocation.path.map((location: ILocation) => (
              <Breadcrumb.Item
                key={location._id.toString()}
                onClick={() => gotoLocation(location._id.toString())}
              >
                {location.title}
              </Breadcrumb.Item>
            ))}
            <Breadcrumb.Item key={currentLocation._id.toString()} active>
              {currentLocation.title}
            </Breadcrumb.Item>
          </>
        )}
      </Breadcrumb>

      {childLocations.map((l) => (
        <Card key={l._id.toString()} style={{ marginBottom: "10px" }}>
          <Card.Body
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <Button
              onClick={() => gotoLocation(l._id.toString())}
              variant="link"
              style={{ marginBottom: "0px" }}
            >
              {l.title}
            </Button>
            <div>
              <Button variant="outline-primary" style={{ marginRight: "5px" }}>
                <PencilFill />
              </Button>
              <Button
                onClick={() => deleteLocation(l)}
                variant="outline-danger"
                style={{}}
              >
                <TrashFill />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <Button onClick={createLocation} variant="outline-primary">Přidat</Button>
    </Container>
  );
}

export default LocationsPage;
