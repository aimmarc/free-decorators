# vue3-class-component
## 开始
- vue3-class-component 让你在vue3中使用类的方式来写组件。
- ​基于TypeScript和装饰器。
- 通过类的方式来写vue组件。
- 兼容 stage3 和 stage2 装饰器。
- 兼容 TypeScript 和 JavaScript 项目。
- 稳定、安全，根据vue规范将es 类转换成vue composition api。
- 高性能，项目加载时转换一次，随处可用。
```Javascript
<template>
    <el-button ref="buttonRef" v-click-outside="onClickOutside"> Click me </el-button>

    <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="With title" virtual-triggering>
        <span> Some content </span>
    </el-popover>
</template>


<script lang="ts">
import { ElPopover, ClickOutside } from 'element-plus';
import { Component, toComponent, Vue } from 'vue3-class-component';

@Component({
    directives: {
        ClickOutside,
    },
})
class Hehe extends Vue {
    popoverRef = this.ref();
    buttonRef = this.ref();

    onClickOutside() {
        this.vue.unref(this.popoverRef).popperRef?.delayHide?.();
    }
}

export default toComponent(Hehe);
</script>
```
如果你喜欢已经废弃的 vue-class-component 或 deprecaed vue-property-decorator, 那么请试试这个项目吧！
欢迎讨论和贡献代码。

## 如何使用？
### 定义一个类组件
类组件必须继承这个项目的Vue基类并且应用这个项目的Component​装饰器。
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component';

@Component
class MyComponent extends Vue {

}

export default toComponent(MyComponent);
```

### 在Vue SFC中使用
在SFC中(.vue 文件)，使用类组件作为默认导出的内容。
```Javascript
<template>
  <div></div>
</template>
<script lang="ts">
// DO NOT USE <script setup>

//vue options API.
/*
import { defineComponent } from "vue";
export default defineComponent({});
*/

//class component
import { Component, Vue, toComponent } from 'vue3-class-component';

@Component
class MyComponent extends Vue {}

export default toComponent(MyComponent);
</script>
<style>
</style>
```
## 组件
### 用法
使用装饰器 Component 来装饰一个类，这个类需要继承Vue基类。
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component';

@Component
class MyComponent extends Vue {

}

export default toComponent(MyComponent);
```
### 选项
Component传入的对象和defineComponent​传入的一致，除了不能传入setup。
### 属性
定义在类组件中的属性均具备响应式，可以当作reactive的属性使用，免去自定义ref和reactive的繁琐。
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component';

@Component
class MyComponent extends Vue {
　　num = 1; // num具备响应式，更改this.num会触发watcher
}

export default toComponent(MyComponent);
```
### 不需要响应式
只需要用MarkRaw装饰属性即可让属性失去响应式，原理和reactive的markRaw一致。
```Javascript
import { Component, toComponent, Vue, MarkRaw } from 'vue3-class-component/src/decorators';

@Component({
    props: {
        num: {
            default: 4,
        },
    },
    emits: ['change'],
})
class MyComponent extends Vue {
    mounted() {
        this.num3 = 5;
        console.log(this.num3, '==='); // 此处会打印更改后的值，但不会被track
    }

    @MarkRaw
    num3 = 1; // num3不具备响应式
}

export default toComponent(MyComponent);
```
### name
​比如name​，就和组件的name​一致：
```Javascript
​import { Component, Vue, toComponent } from 'vue3-class-component';  
@Component({
　　name: 'my-component',
}) 
class MyComponent extends Vue {  }  
export default toComponent(MyComponent);
```
### emits
使用emits注入事件，通过this.emit触发。
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component';  
@Component({
　　name: 'my-component',
　　emits: ['my-event']
}) 
class MyComponent extends Vue { 
　　mounted() {
　　　　this.emit('my-event');　
　　}
}
export default toComponent(MyComponent);
```
想要获得emits类型提示，需要将emits作为范型传入：
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component';

@Component({
    name: 'my-component',
    emits: ['my-event'],
})
class MyComponent extends Vue<any, ['my-event']> {
    mounted() {
        this.emit('my-event');
    }
}
export default toComponent(MyComponent);
```
### components
和组件的components属性一致，组件必须通过Component注册才能使用，全局组件除外。
```Javascript
import { Component, toComponent, Vue } from 'vue3-class-component';
import Test from './Test.vue';
import Hehe from './Hehe.vue';

@Component({
    components: { Test, Hehe },
})
class App extends Vue<any, ['youer-event']> {

}

export default toComponent(App);
```
### derictives
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component/src/decorator';
import { ClickOutside } from 'element-plus';

@Component({
    directives: {
        ClickOutside,
    },
})
class MyComponent extends Vue<any, ['my-event']> {

}

export default toComponent(MyComponent);
```
### expose
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component';

@Component({
    expose: ['hehe'],
})
class MyComponent extends Vue {
    hehe() {
        alert(2);
    }
}

export default toComponent(MyComponent);
```
### slots、attrs
通过this调用，
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component/src/decorator';

@Component
class MyComponent extends Vue {
    mounted() {
        console.log(this.attrs);
        console.log(this.slots);
    }
}

export default toComponent(MyComponent);
```
### props
props建议通过element-plus的buildProps进行构建，这样方便将props类型对象转换为ts类型，从而传入范型获得类型提示。
```Javascript
import { Component, Setup, toComponent, Vue, Watch, WatchEffect } from 'vue3-class-component';
import { StoreType } from '@/common/interfaces/Store';
import { ExtractPropTypes, ref } from 'vue';
import { buildProps, definePropType } from 'element-plus';

const props = buildProps({
    num: {
        type: definePropType<number>(Number),
        default: 0,
    },
    num1: {
        type: definePropType<number>(Number),
        default: 0,
    },
} as const);

type PropTypes = ExtractPropTypes<typeof props>;

@Component({
    emits: ['youer-event'],
    props,
})
class Test extends Vue<PropTypes> {}

export default toComponent<PropTypes, Test>(Test);
```
在类组件中通过this.props（v1.0.0提供支持）使用，在template中直接通过props中的属性使用。
```Javascript
...
@Component({
    emits: ['youer-event'],
    props,
})
class Test extends Vue<StoreType, PropTypes> {
　　...
　　c = this.computed(() => {
        return this.props.num + this.props.num1;
   });
　　...
}
...
<div>{{ num }}</div>
```
### @Prop
还可以通过Prop装饰器定义props，会被自动补充到Component注入的props中。如果有重名，Prop装饰器优先级更高。
```Javascript
import { Component, Vue, Inject, Prop } from 'vue3-class-component/src/decorators';

@Component
class MyComponent extends Vue {
    @Inject
    num2!: number;

    @Prop({
        type: Number,
        default: 5,
    })
    num1!: number;

    mounted() {}
}

export default toComponent(MyComponent);
```
### setup钩子
组件提供了setup钩子，方便在setup阶段做一些操作。
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component';

@Component({})
class MyComponent extends Vue {
    setup() {
        console.log('setup');
    }
}

export default toComponent(MyComponent);
```
### @Watch
提供了一个@Watch方法装饰器，用于简化侦听器逻辑。接收两个参数，key和options，key表示要侦听的当前组件的属性，options和watch的options一致。
```Javascript
import { Component, Vue, toComponent, Watch } from 'vue3-class-component';

@Component
class MyComponent extends Vue {
    num = 1;

    @Watch('num', {
        immediate: true,
    })
    numChange(newVal: number) {
        console.log(newVal);
    }
}

export default toComponent(MyComponent);
```
### @WatchEffect
用法如下。
```Javascript
import { ComponentOptions, Vue, toComponent, Watch, WatchEffect } from 'vue3-class-component';

@ComponentOptions({})
class MyComponent extends Vue {
    num = 1;

    @WatchEffect({
　　　　flush: 'post',
　　 })
    myWatchEffect() {
        console.log(this.num);
    }
}

export default toComponent(MyComponent);
```
### @Setup
Setup装饰器可以用于方法和属性，用于方法：方法将在setup阶段被自动执行；用于属性：需要传入回调处理函数，函数需要返回你想赋值给属性的值，允许将Hook作为值供属性使用。
```Javascript
import { Component, toComponent, Setup, Watch, Vue } from 'vue3-class-component';
import { ref, type Ref } from 'vue';
import { useRouter, useRoute, RouteLocationNormalizedLoaded, Router } from 'vue-router';

@Component
class MyComponent extends Vue {
    // 定义ref
    @Setup(() => ref(1))
    num!: Ref<number>;
    @Watch('num', {
        immediate: true,
    })
    numChange(newVal: number) {
        console.log(newVal);
    }
    // 定义route
    @Setup(useRoute)
    route!: RouteLocationNormalizedLoaded;
    // 定义router
    @Setup(useRouter)
    router!: Router;
    protected mounted(): void {
        console.log(this.route, this.router, this.num);
    }
    // 用于方法
    @Setup()
    doSth() {
        console.log('doSth');
    }
}

export default toComponent(MyComponent);
```
### @Inject
使用@Inject可以很轻松实现属性的注入。
```Javascript
import { Component, toComponent, Vue, Setup, Watch, Inject } from 'vue3-class-component';
import { ref, type Ref } from 'vue';
import { useRouter, useRoute, RouteLocationNormalizedLoaded, Router } from 'vue-router';

@Component
class MyComponent extends Vue {
    @Inject(0)
    num!: number;
}

export default toComponent(MyComponent);
```
### @Provide
使用如下。
```Javascript
import { Component, toComponent, Vue, Provide } from 'vue3-class-component';
import { StoreType } from '@/common/interfaces/Store';
import Test from './Test.vue';
import Hehe from './Hehe.vue';

@Component({
    emits: ['youer-event'],
    components: { Test, Hehe },
})
class App extends Vue<StoreType, any, ['youer-event']> {
    @Provide
    num = this.ref(12);

    handleAdd() {
        this.num.value++;
    }
}

export default toComponent(App);
```
使用别名。
```Javascript
import { Component, toComponent, Vue, Provide } from 'vue3-class-component';
import { StoreType } from '@/common/interfaces/Store';
import Test from './Test.vue';
import Hehe from './Hehe.vue';

@Component({
    emits: ['youer-event'],
    components: { Test, Hehe },
})
class App extends Vue<StoreType, any, ['youer-event']> {
    @Provide('num1')
    num = this.ref(12);

    handleAdd() {
        this.num.value++;
    }
}

export default toComponent(App);
```
## 钩子
vue3-class-component几乎支持所有Vue原生钩子，用法与同选项式API的钩子相同。
```Javascript
import { Component, Vue, toComponent } from 'vue3-class-component/src/decorators';

@Component
class MyComponent extends Vue {
    num = 1;

    mounted() {
        console.log(this.num);
    }
}

export default toComponent(MyComponent);
```
支持的钩子列表：
- setup
- beforeMount
- ​mounted
- ​beforeUpdate
​- updated
- ​beforeUnmount
- ​unmounted
​- activated
- ​deactivated
- ​errorCaptured
## 存取器
### 用法
使用get即可实现类似computed的功能。
```Javascript
import { Component, toComponent, Vue, Watch } from 'vue3-class-component';

@Component({
    emits: ['youer-event'],
})
class App extends Vue<any, ['youer-event']> {
    handleAdd() {
        this.num.value++;
    }

    get propsNum() {
        return this.props.num;
    }
}

export default toComponent(App);
```
### 可写的
这种写法和computed的set一致。
```Javascript
import { Component, toComponent, Vue, Watch } from 'vue3-class-component';

@Component({
    emits: ['change'],
})
class App extends Vue<any, ['change']> {
    handleAdd() {
        this.num.value++;
    }

    get propsNum() {
        return this.props.num;
    }

    set propsNum(val) {
        return this.emit('change', val);
    }
}

export default toComponent(App);
```
## 试验性API
### JSX
支持JSX写法，但目前是实验特性，可能会存在致命bug，请谨慎使用。
```Javascript
import { Component, toComponent, Vue, Setup, Watch, Prop } from 'vue3-class-component';
import { Ref, ref } from 'vue';

@Component
class TsxTest extends Vue {
    num = 90;
    @Setup(() => ref(12))
    num2!: Ref<number>;
    @Watch('num')
    numChange(newVal: number) {
        console.log(newVal);
    }
    num3 = this.ref(99);
    get nums() {
        return this.num3;
    }
    @Prop({
        type: Number,
        default: 10,
    })
    prop1!: number;

    handleAdd = () => {
        this.num++;
        this.num3.value++;
        this.num2.value++;
    };

    render() {
        return (
            <>
                <div>{this.num}</div>
                <div>{this.num2.value}</div>
                <div>{this.num3?.value}</div>
                <div>{this.nums.value}</div>
                <div>{this.prop1}</div>
                <button onClick={this.handleAdd}>+</button>
            </>
        );
    }
}

export default toComponent(TsxTest);
```
## （必看！）注意事项
### 箭头函数
框架中不限制箭头函数的使用，但是要注意在装饰器组件中使用箭头函数，更改组件最顶层的属性是不会触发响应式的，这是由于箭头函数的this无法被更改，所以无法被proxy的get set劫持。使用箭头函数会触发警告！
就算一定要使用箭头函数，也尽量避免直接使用this.xxx = xxx的形式更改属性，这将不会触发响应式。可以使用ref代替普通属性，但还是不建议这样做。