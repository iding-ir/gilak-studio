import type { Action } from "./actions";
import type { CanvasState } from "./types";

const moveLayer = (
  layers: CanvasState["layers"],
  layerId: string,
  direction: "up" | "down",
) => {
  const index = layers.findIndex((layer) => layer.id === layerId);

  if (index === -1) {
    return layers;
  }

  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= layers.length) {
    return layers;
  }

  const nextLayers = [...layers];
  const [layer] = nextLayers.splice(index, 1);
  nextLayers.splice(targetIndex, 0, layer);

  return nextLayers;
};

export const reducer = (state: CanvasState, action: Action): CanvasState => {
  switch (action.type) {
    case "ADD_LAYER": {
      const layer = {
        ...action.payload,
        visible: action.payload.visible ?? true,
      };

      return { ...state, layers: [layer, ...state.layers] };
    }
    case "REMOVE_LAYER": {
      return {
        ...state,
        layers: state.layers.filter((layer) => layer.id !== action.payload),
      };
    }
    case "HIDE_LAYER": {
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === action.payload ? { ...layer, visible: false } : layer,
        ),
      };
    }
    case "SHOWS_LAYER": {
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === action.payload ? { ...layer, visible: true } : layer,
        ),
      };
    }
    case "MOVE_LAYER_UP": {
      return {
        ...state,
        layers: moveLayer(state.layers, action.payload, "up"),
      };
    }
    case "MOVE_LAYER_DOWN": {
      return {
        ...state,
        layers: moveLayer(state.layers, action.payload, "down"),
      };
    }
    default:
      return state;
  }
};
