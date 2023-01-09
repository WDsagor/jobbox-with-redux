import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user",
        body: data,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        console.log(data.email);
        try {
          const res = await queryFulfilled;
          if (res) {
            dispatch(getUser(data.email));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const { useUserRegisterMutation } = authApi;
