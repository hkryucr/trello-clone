<template>
<div
@click.stop.prevent="stopTheEvent"
style="position: absolute; top: 4px; left: 0px; box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);"
class="delete-warning-modal inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
role="dialog"
aria-modal="true"
aria-labelledby="modal-headline">
  <div class="bg-white" style="padding: 1rem 1.4rem 0.6rem 1.4rem;">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10" style="background-color: rgba(253,232,232, 1); width: 8.5rem;">
        <svg class="h-6 w-6 text-red-600" style="color: #cf513d;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h5 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline" style="font-size: 15px; font-weight: 600">
          Delete {{target}}?
        </h5>
        <div class="mt-2">
          <p class="text-sm leading-5 text-gray-500" style="line-height: 20px;">
            Are you sure you want to delete this {{target}}? All of your data will be permanently removed. This action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" style="padding-top: .7rem;">
    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
      <button id="deleteWarningDelete" @click.prevent="deleteTarget" type="button"
      style="border-radius: 0.375rem; background-color: #cf513d;"
      class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
        Delete
      </button>
    </span>
    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
      <button id="deleteWarningCancel" @click.prevent="cancel"
      style="border-radius: 0.375rem;"
      type="button"
      class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
        Cancel
      </button>
    </span>
  </div>
</div>
</template>

<script>
export default {
  props: ['cancel', 'deleteTarget', 'target'],
  methods: {
    stopTheEvent: (event) => event.stopPropagation()
  }
}
</script>

<style>
.delete-warning-modal .py-2 {
  padding-top: .25rem;
  padding-bottom: .25rem;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}
/* .delete-warning-modal .py-2:hover {
  background-color: rgba(241, 241, 241, 0.349);
} */
#deleteWarningDelete:hover {
  background-color: #b8211c !important;
}
#deleteWarningCancel:hover {
  color: rgb(83, 83, 83);
  background-color: rgb(219, 219, 219) !important;
}
.text-gray-500 {
  /* --text-opacity: 1; */
  color: #67748a;
  /* color: rgba(107,114,128,var(--text-opacity)); */
}
.text-gray-900 {
    --text-opacity: 1;
    color: #161e2e;
    color: rgba(22,30,46,var(--text-opacity));
}
.leading-6 {
    line-height: 1.5rem;
}
.font-medium {
    font-weight: 500;
}
.text-lg {
    font-size: 1.125rem;
}
.sm\:ml-4 {
    margin-left: 1rem;
}
.text-sm {
    font-size: 14px;
}
.sm\:w-10 {
    width: 2.5rem;
}
.sm\:h-10 {
    height: 2.5rem;
}
.sm\:pb-4 {
    padding-bottom: 1rem;
}
.bg-gray-50 {
  --bg-opacity: 1;
  background-color: #f9fafb;
  background-color: rgba(249,250,251,var(--bg-opacity));
}
</style>
