import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => {
        return {
          url: `hospital/departments`,
          method: "GET",
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getDepartmentInfo: builder.query({
      query: (id) => {
        return {
          url: `hospital/departments/${id}/`,
          method: "GET",
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
    getDeptDoctors: builder.query({
      query: (id) => {
        return {
          url: `doctors/get_doctors_by_department/?department_id=${id}`,
          method: "GET",
        };
      },
      transformErrorResponse: (response) => ({
        status: response.status,
        error: response.error,
        message: response.data?.message,
      }),
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useGetDeptDoctorsQuery,
  useLazyGetDeptDoctorsQuery,
  useLazyGetDepartmentInfoQuery
} = authApiSlice;
