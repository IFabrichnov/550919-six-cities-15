import { createAction } from '@reduxjs/toolkit';
import { AppRoutes } from '../const';

export const redirectToRoute = createAction<AppRoutes>('game/redirectToRoute');
