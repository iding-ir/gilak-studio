import type { Action } from "./actions";
import type { State } from "./state";

const moveLayer = (
  layers: State["layers"],
  layerId: string,
  direction: "up" | "down",
) => {
  const layerArray = Array.from(layers.values());
  const index = layerArray.findIndex((layer) => layer.id === layerId);

  if (index === -1) return layers;

  const newIndex =
    direction === "up"
      ? Math.min(index + 1, layerArray.length - 1)
      : Math.max(index - 1, 0);

  if (newIndex === index) return layers;

  const [movedLayer] = layerArray.splice(index, 1);
  layerArray.splice(newIndex, 0, movedLayer);

  const newLayers = new Map<string, typeof movedLayer>();
  layerArray.forEach((layer) => {
    newLayers.set(layer.id, layer);
  });

  return newLayers;
};

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "ADD_LAYER": {
      const layers = new Map(state.layers);
      layers.set(payload.id, payload);

      return { ...state, layers };
    }
    case "REMOVE_LAYER": {
      const layers = new Map(state.layers);
      layers.delete(payload.id);

      return { ...state, layers };
    }
    case "REMOVE_LAYERS": {
      const layers = new Map(state.layers);
      payload.forEach((id) => layers.delete(id));

      return { ...state, layers };
    }
    case "HIDE_LAYER": {
      const layers = new Map(state.layers);
      layers.set(payload.id, { ...layers.get(payload.id)!, visible: false });

      return { ...state, layers };
    }
    case "SHOW_LAYER": {
      const layers = new Map(state.layers);
      layers.set(payload.id, { ...layers.get(payload.id)!, visible: true });

      return { ...state, layers };
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
    case "SELECT_LAYER": {
      const layers = new Map(state.layers);
      layers.set(payload.id, { ...layers.get(payload.id)!, selected: true });

      return { ...state, layers };
    }
    case "DESELECT_LAYER": {
      const layers = new Map(state.layers);
      layers.set(payload.id, { ...layers.get(payload.id)!, selected: false });

      return { ...state, layers };
    }
    case "FOCUS_LAYER": {
      const layers = new Map(state.layers);
      layers.set(payload.id, { ...layers.get(payload.id)!, focused: true });

      return { ...state, layers };
    }
    case "ADD_TO_LAYER_CONTENT": {
      const layers = new Map(state.layers);
      const layer = layers.get(payload.id);
      if (!layer) return state;

      layers.set(payload.id, {
        ...layer,
        content: [...layer.content, ...payload.content],
      });

      return { ...state, layers };
    }
    case "CLEAR_LAYER_CONTENT": {
      const layers = new Map(state.layers);
      const layer = layers.get(payload.id);
      if (!layer) return state;

      layers.set(payload.id, {
        ...layer,
        content: [],
      });

      return { ...state, layers };
    }
    default:
      return state;
  }
};
