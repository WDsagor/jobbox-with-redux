import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    apply: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJob: builder.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["Jobs"],
    }),
    getJobByID: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
      providesTags: ["Jobs"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `/applied-jobs/${email}`,
      }),
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobQuery,
  useGetJobByIDQuery,
  useApplyMutation,
  useGetAppliedJobsQuery,
} = jobApi;
