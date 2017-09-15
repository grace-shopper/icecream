import axios from 'axios';

const HAS_CART = 'HAS_CART';

export function updateToExists() {
  const action = { type: HAS_CART };
  return action;
}

const reducer = function (state = false, action) {
  switch (action.type) {
    case HAS_CART:
      return true

    default:
      return state
  }
}
