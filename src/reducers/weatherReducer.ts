export interface IWeather {
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  sys: {
    country: string;
  };
  id: number;
  name: string;
}

// ACTION TYPES
export const FETCH_WEATHER = "FETCH_WEATHER";
export const SUCCESS_FETCH_WEATHER = "SUCCESS_FETCH_WEATHER";
export const FAILURE_FETCH_WEATHER = "FAILURE_FETCH_WEATHER";

// ACTION CREATORS
export const getWeather = (): IGetWeatherAction => ({
  type: FETCH_WEATHER
});

export const getWeatherSuccess = (
  weather: IWeather[]
): IGetWeatherSuccessAction => ({
  type: SUCCESS_FETCH_WEATHER,
  weather
});

export const getWeatherFailure = (error: Error): IGetWeatherFailureAction => ({
  type: FAILURE_FETCH_WEATHER,
  error
});

export const fetchWeather = (cityId: string) => (dispatch: any) => {
  dispatch(getWeather());
  fetch(
    "https://api.openweathermap.org/data/2.5/group?id=" +
      cityId +
      "&appid=0f33f5c78acf44e7d38b5f6706f6f59d"
  )
    .then(res => res.json())
    .then(data => dispatch(getWeatherSuccess(data.list)))
    .catch(error => dispatch(getWeatherFailure(error)));
};

// ACTION INTERFACES
export interface IGetWeatherAction {
  type: typeof FETCH_WEATHER;
}
export interface IGetWeatherSuccessAction {
  type: typeof SUCCESS_FETCH_WEATHER;
  weather: IWeather[];
}
export interface IGetWeatherFailureAction {
  type: typeof FAILURE_FETCH_WEATHER;
  error: Error;
}

// COMBINING ACTION CREATORS
type IWeatherActions =
  | IGetWeatherAction
  | IGetWeatherSuccessAction
  | IGetWeatherFailureAction;

export interface IWeatherState {
  weather: IWeather[];
  error: null | Error;
  loading: boolean;
}

// REDUCER WITH INITIAL STATE
const initialState: IWeatherState = {
  weather: [],
  error: null,
  loading: false
};

const weatherReducer = (state = initialState, action: IWeatherActions) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, loading: true, error: null };
    case SUCCESS_FETCH_WEATHER:
      return { ...state, loading: false, error: null, weather: action.weather };
    case FAILURE_FETCH_WEATHER:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default weatherReducer;
