import getGarage from "@/api/garages/get-garage";

type Props = { params: { garageId: string } };

export default async function GaragePage(props: Props) {
  const [garage] = await getGarage(props.params.garageId);

  return (
    <>
      <h1>Garage</h1>
      <p>{garage.name}</p>
    </>
  );
}
