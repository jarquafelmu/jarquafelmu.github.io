<template>
  <div>
    <div class="border rounded border-primary h-100 py-3 px-1">
      <span id="card-body" class=""
        ><img src="svg/square.svg" alt="a square card" srcset=""
      /></span>
    </div>
    <div class="border rounded border-primary h-100 py-3 px-1">
      <img src="svg/circle.svg" alt="a circle card" srcset="" />
      <div id="card-body" class="align-self-center"></div>
    </div>
    <div class="col border rounded border-primary h-100 py-3 px-1">
      <div id="card-body">
        <img src="svg/star.svg" alt="a star card" srcset="" />
      </div>
    </div>
    <div class="col border rounded border-primary h-100 py-3 px-1">
      <div id="card-body">
        <img src="svg/waves.svg" alt="a waves card" srcset="" />
      </div>
    </div>
    <div class="col border rounded border-primary h-100 py-3 px-1">
      <div id="card-body">
        <img src="svg/plus.svg" alt="a plus card" srcset="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cards",
};
</script>
