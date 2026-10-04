import { baseApi } from "@/lib/redux/api/baseApi";
import { CONTACT_API_BASE_URL, CONTACT_API_ENDPOINT, type ContactPayload } from "@/lib/contact";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<unknown, ContactPayload>({
      query: (body) => ({
        // Absolute URL: the contacts endpoint lives on a different host than baseApi.
        url: `${CONTACT_API_BASE_URL}${CONTACT_API_ENDPOINT}`,
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body,
      }),
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;