import type { Action } from "./actions";
import type { State } from "./state";

const moveLayer = (
  layers: State["layers"],
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

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "ADD_LAYER": {
      const layer = {
        ...payload,
        visible: payload.visible ?? true,
      };

      return { ...state, layers: [layer, ...state.layers] };
    }
    case "REMOVE_LAYER": {
      return {
        ...state,
        layers: state.layers.filter((layer) => layer.id !== payload.id),
      };
    }
    case "REMOVE_DOCUMENT_LAYERS": {
      return {
        ...state,
        layers: state.layers.filter(
          (layer) => layer.documentId !== payload.documentId,
        ),
      };
    }
    case "HIDE_LAYER": {
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === payload.id ? { ...layer, visible: false } : layer,
        ),
      };
    }
    case "SHOW_LAYER": {
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === payload.id ? { ...layer, visible: true } : layer,
        ),
      };
    }
    case "MOVE_LAYER_UP": {
      return {
        ...state,
        layers: moveLayer(state.layers, payload.id, "up"),
      };
    }
    case "MOVE_LAYER_DOWN": {
      return {
        ...state,
        layers: moveLayer(state.layers, payload.id, "down"),
      };
    }
    default:
      return state;
  }
};
