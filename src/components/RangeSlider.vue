<template>
    <div class="range-container">
        <div
            :style="{width: getWidth}"
            class="range-selected"/>
        <input
            v-model.number="currentValue"
            :max="maxValue"
            :step="step"
            class="range"
            min="0"
            type="range"
            @input="onInput"
        >
        <div class="range-unselected"/>
    </div>
</template>

<script>
export default {
    name: 'RangeSlider',
    props: {
        value: {
            type: Number,
            required: true,
        },
        maxValue: {
            type: Number,
            required: true,
        },
        step: {
            type: Number,
            default() {
                return 1;
            }
        }
    },
    emits: ['change'],
    data() {
        return {
            currentValue: this.value,
        };
    },
    computed: {
        getWidth() {
            //fixme
            let divide = (this.currentValue / this.maxValue) * 100;
            if (isNaN(divide))
                return '0%';
            else if (divide < 50)
                return `${divide + 1}%`;
            else
                return `${divide - 1}%`;
        },
    },
    watch: {
        value(value) {
            this.currentValue = value;
        }
    },
    methods: {
        onInput() {
            this.$emit('change', this.currentValue);
        }
    }
};
</script>

<style scoped>
.range-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100%;
}

.range-unselected, .range-selected {
    background: #A1A1A1;
    width: calc(100% - 2px);
    height: 6px;
    position: absolute;
    z-index: 5;
    border-radius: 15px;
    left: 0;
}

.range-selected {
    background: var(--main-color);
    z-index: 10;
}

.range {
    height: 6px;
    -webkit-appearance: none;
    outline: none;
    background: none;
    z-index: 20;
    width: 100%;
}

.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    cursor: pointer;
    border: 4px solid #434343;
    background: var(--main-color);
}

</style>
