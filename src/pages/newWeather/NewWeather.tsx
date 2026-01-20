import { useLocation } from "react-router-dom";
import { Detail } from "../../entities/detail/components/Detail";

export function NewWeather() {
const location = useLocation();

  const place = location.state.place;

  console.log(place);

  if (!place) {
    return <div>No place found</div>;
  }

  return <Detail place={place}/>;
}

