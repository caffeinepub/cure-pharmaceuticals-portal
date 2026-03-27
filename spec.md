# Cure Pharmaceuticals Portal

## Current State
Full-stack lead gen portal with hero video, product info, inquiry form, SEO section, contact page, admin panel (hidden at /Alexx). Backend stores leads only.

## Requested Changes (Diff)

### Add
- `ProductTouchDown` component: horizontal infinite marquee of product images scrolling right-to-left in a continuous loop. Displays below FeaturedProducts section.
- Backend: `ProductShowcaseImage` type with `id`, `url`, `label`, `position` fields. Methods: `addShowcaseImage`, `getAllShowcaseImages`, `deleteShowcaseImage`, `reorderShowcaseImages`.
- Admin panel tab/section: "TouchDown Images" — list current images with URL, allow add new image (URL + label), delete images.

### Modify
- `App.tsx`: Insert `<ProductTouchDown />` between `<FeaturedProducts />` and `<CommitmentSection />`.
- `AdminDashboard`: Add second tab for managing TouchDown images.
- `main.mo`: Add showcase image storage and CRUD methods.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `main.mo` to add image storage with add/get/delete methods (admin-gated mutations).
2. Regenerate `backend.d.ts` bindings.
3. Add `useShowcaseImages`, `useAddShowcaseImage`, `useDeleteShowcaseImage` hooks in `useQueries.ts`.
4. Build `ProductTouchDown` component with CSS keyframe marquee animation (duplicate items for seamless loop).
5. Add "TouchDown Images" section in `AdminDashboard` with add-by-URL form and delete buttons.
6. Wire everything in `App.tsx`.
