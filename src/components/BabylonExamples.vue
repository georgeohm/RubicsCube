<template>
  <div>
    <h3>Babylon Examples</h3>
    <canvas></canvas>
  </div>  
</template>

<script lang="ts">
import { BasicScene } from '@/BabylonExamples/BasicScene';
import { defineComponent } from 'vue';
import {StandardMaterials} from '@/BabylonExamples/StandardMaterials'
import {RubicsCubeScene} from '@/BabylonExamples/RubicsCubeScene'

export default defineComponent({
  name: 'BabylonExamples',
  mounted(){
    const canvas = document.querySelector("canvas")!;
    // new BasicScene(canvas);
    // new StandardMaterials(canvas);
    new RubicsCubeScene(canvas);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 80%;
  height: 80%
}
</style>
