<template>
  <div>
    <div
      class="absolute right-4 top-1/2 z-10 grid w-auto grid-flow-row gap-2 rounded-xl p-4 backdrop-blur-3xl"
    >
      <UButton
        icon="i-bi-badge-vr"
        size="sm"
        color="primary"
        @click="() => onEnterVR()"
      />
      <UButton
        icon="i-bi-badge-ar"
        size="sm"
        color="primary"
        @click="() => onEnterVR(true)"
      />
      <UButton
        icon="i-bi-bar-chart"
        size="sm"
        color="primary"
        @click="onToggleStats"
      />
      <UButton
        icon="i-bi-airplane"
        size="sm"
        :color="flyEnabled ? 'primary' : 'gray'"
        @click="onToggleFly"
      />
      <UButton
        label="P0"
        size="sm"
        color="primary"
        @click="() => onGoToPoint(P0, R0)"
      />
      <UButton
        label="P1"
        size="sm"
        color="primary"
        @click="() => onGoToPoint(P1, R1)"
      />
      <UButton
        label="P2"
        size="sm"
        color="primary"
        @click="() => onGoToPoint(P2, R2)"
      />
    </div>

    <a-scene ref="scene">
      <a-entity
        id="rig"
        :movement-controls="`speed:10; fly: ${flyEnabled ? 'true' : 'false'}`"
        :position="currPosString"
        :rotation="currRotationString"
      >
        <a-entity camera look-controls="pointerLockEnabled: true"></a-entity>
      </a-entity>
      <!-- <a-entity
        camera
        look-controls
        wasd-controls=""
        position="0 1.6 0"
      ></a-entity> -->

      <!-- <a-entity
        camera
        ref="camera"
        look-controls
        wasd-controls="acceleration:100"
        position="0 1.6 0"
      ></a-entity> -->
      <!-- <a-entity id="rig" movement-controls ref="movementControl">
        <a-entity
          camera
          position="0 1.7 0"
          look-controls="pointerLockEnabled: true"
        ></a-entity>
      </a-entity> -->

      <a-assets>
        <a-asset-item id="model-obj" src="/model/model.obj"></a-asset-item>
        <a-asset-item id="model-mtl" src="/model/model.mtl"></a-asset-item>
      </a-assets>

      <a-entity obj-model="obj: #model-obj; mtl: #model-mtl"></a-entity>
    </a-scene>
  </div>
</template>

<script lang="ts">
import "aframe";
import "aframe-extras";

interface Pos {
  x: number;
  y: number;
  z: number;
}
</script>
<script setup lang="ts">
import type { Scene } from "aframe";

const P0: Pos = { x: 1000, y: 170, z: -2400 };
const R0: Pos = { x: 0, y: -90, z: 0 };
const P1: Pos = { x: 2100, y: 420, z: -1420 };
const R1: Pos = { x: 0, y: -90, z: 0 };
const P2: Pos = { x: 1550, y: 1050, z: -1450 };
const R2: Pos = { x: 0, y: 180, z: 0 };

const scene = ref<Scene | null>(null);
// const camera = ref<Entity<THREE.Camera> | null>(null);
// const movementControl = ref<Entity | null>(null);

const flyEnabled = ref<boolean>(false);
const currPos = ref<Pos>(P0);
const currPosString = computed(
  () => `${currPos.value.x} ${currPos.value.y} ${currPos.value.z}`,
);
const currRotation = ref<Pos>(R0);
const currRotationString = computed(
  () =>
    `${currRotation.value.x} ${currRotation.value.y} ${currRotation.value.z}`,
);

async function onEnterVR(ar = false) {
  await (scene.value?.enterVR as any)(ar);
}

function onToggleStats() {
  scene.value?.toggleAttribute("stats");
}

function onToggleFly() {
  flyEnabled.value = !flyEnabled.value;

  // const control = movementControl.value?.components["movement-controls"];

  // if (!control) {
  //   return;
  // }

  // control.data.fly = !control.data.fly;
  // flyEnabled.value = control.data.fly;

  // if (!control.data.fly) {
  //   (control.data["camera"] as Entity).components.position.data.y = 1.7;
  //   // TODO does not work correctly
  //   ((control.data["camera"] as Entity).components.position.update as any)();
  // }
}

function onGoToPoint(pos: Pos, rotation: Pos) {
  currPos.value = pos;
  currRotation.value = rotation;
}
</script>
