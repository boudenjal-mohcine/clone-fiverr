// actions.js
import { UPDATE_USER_GIGS } from './types';

export const updateUserGigs = (gigs) => {
    return {
      type: UPDATE_USER_GIGS,
      payload: gigs
    };
 };