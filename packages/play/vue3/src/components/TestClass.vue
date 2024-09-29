<template>
	<div>{{ name }}</div>
</template>

<script lang="ts">
import { Vue, Component, toComponent } from '@aimmarc/vue3-class-component';

@Component
class TestClass extends Vue {
	name = 'TestClass';
}

export default toComponent(TestClass);
</script>
