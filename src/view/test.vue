<template>
  <div class="wrap">
    <div id="myChart" :style="{width: '100%', height:'100%'}">
      232
    </div>
  </div>
</template>

<script>
    import echarts from 'echarts'
    import geoAtlas from '../utils/geoAtlas'
    import heNan from '../utils/heNan'

    export default {
        name: "test",
        data() {
            return {
                myChart: null
            }
        },
        mounted() {
            this.drawLine();
            console.log(geoAtlas);
        },
        methods: {
            drawLine() {
                let myChart = echarts.init(document.getElementById('myChart'));
                this.myChart = myChart;
                myChart.showLoading();
                window.onresize = function () {
                    myChart.resize();
                };
                myChart.hideLoading();
                echarts.registerMap('china', geoAtlas);
                myChart.setOption({
                    title: {
                        text: '全国',
                        // subtext: '活跃数据'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            if (!params.data) {
                                if (params.name) {
                                    return params.name + ' ' + params.value
                                }
                                return '无数据'
                            }
                            let name = params.data.name || '无', number = params.data.number || '无',
                                schoolNumber = params.data.schoolNumber || '无',
                                active = params.data.active || '无';
                            return `${name + ' ' + params.value}</br>${number}</br>${schoolNumber}</br>${active}`
                        }
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},//点击侧边栏工具弹出的数据视图是否不可编辑
                            restore: {},//配置项还原
                            saveAsImage: {}//保存为图片
                        }
                    },
                    visualMap: {
                        type: 'piecewise',
                        pieces: [
                            {min: 50}, // 不指定 max，表示 max 为无限大（Infinity）。
                            {min: 40, max: 50},
                            {min: 30, max: 40},
                            {min: 20, max: 30},
                            {min: 10, max: 20},
                            {max: 5}     // 不指定 min，表示 min 为无限大（-Infinity）。
                        ],
                        inRange: {
                            color: ['#FFFFFF', '#B80909']//数据色彩
                        }
                    },
                    series: [
                        {
                            name: '中国地图',
                            type: 'map',
                            mapType: 'china', // 自定义扩展图表类型
                            zoom: 1.5, //当前视角的缩放比例
                            roam: true, //是否开启平游或缩放
                            itemStyle: {
                                areaColor: '#ffffff',
                                color:'#ffffff',
                                emphasis: { label: { show: false } },
                                normal: { label: { show: false } }
                            },
                            scaleLimit: { //滚轮缩放的极限控制
                                min: 1,
                                max: 10
                            },
                            label: {
                                show: true
                            },
                            data: [
                                {name: '河南省', value: 60, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                {name: '山东省', value: 30, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                {name: '江西省', value: 30, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                {name: '甘肃省', value: 30, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                {name: '浙江省', value: 30, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'}
                                // {name: '中西区', value: 20057.34},
                                // {name: '湾仔', value: 15477.48},
                                // {name: '东区', value: 31686.1},
                                // {name: '南区', value: 6992.6},
                                // {name: '油尖旺', value: 44045.49},
                                // {name: '深水埗', value: 40689.64},
                                // {name: '九龙城', value: 37659.78},
                                // {name: '黄大仙', value: 45180.97},
                                // {name: '观塘', value: 55204.26},
                                // {name: '葵青', value: 21900.9},
                                // {name: '荃湾', value: 4918.26},
                                // {name: '屯门', value: 5881.84},
                                // {name: '元朗', value: 4178.01},
                                // {name: '北区', value: 2227.92},
                                // {name: '大埔', value: 2180.98},
                                // {name: '沙田', value: 9172.94},
                                // {name: '西贡', value: 3368},
                                // {name: '离岛', value: 806.98}
                            ],
                            // 自定义名称映射
                            // nameMap: {
                            //     'Central and Western': '中西区',
                            //     'Eastern': '东区',
                            //     'Islands': '离岛',
                            //     'Kowloon City': '九龙城',
                            //     'Kwai Tsing': '葵青',
                            //     'Kwun Tong': '观塘',
                            //     'North': '北区',
                            //     'Sai Kung': '西贡',
                            //     'Sha Tin': '沙田',
                            //     'Sham Shui Po': '深水埗',
                            //     'Southern': '南区',
                            //     'Tai Po': '大埔',
                            //     'Tsuen Wan': '荃湾',
                            //     'Tuen Mun': '屯门',
                            //     'Wan Chai': '湾仔',
                            //     'Wong Tai Sin': '黄大仙',
                            //     'Yau Tsim Mong': '油尖旺',
                            //     'Yuen Long': '元朗'
                            // }
                        }
                    ]
                });
                myChart.on('click', this.echartsClick);
            },
            echartsClick(params) {
                console.log(params);
                let name=params.name;
                for (var i =0;i<geoAtlas.features.length;i++){
                    if(geoAtlas.features[i].properties.name===name){
                        console.log(geoAtlas.features[i].properties.adcode);
                        break;
                    }
                }
                // this.myChart.clear();
                // this.myChart.dispose();
                // if (params.data) {
                if (false) {
                    if (params.data.name === '河南省') {
                        let myChart = echarts.init(document.getElementById('myChart'));
                        this.myChart = myChart;
                        window.onresize = function () {
                            myChart.resize();
                        }
                        echarts.registerMap('china', heNan);
                        this.myChart.setOption({
                            title: {
                                text: '河南',
                                // subtext: '活跃数据'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: function (params) {
                                    if (!params.data) {
                                        if (params.name) {
                                            return params.name + ' ' + params.value
                                        }
                                        return '无数据'
                                    }
                                    let name = params.data.name || '无', number = params.data.number || '无',
                                        schoolNumber = params.data.schoolNumber || '无',
                                        active = params.data.active || '无';
                                    return `${name + ' ' + params.value}</br>${number}</br>${schoolNumber}</br>${active}`
                                }
                            },
                            toolbox: {
                                show: true,
                                orient: 'vertical',
                                left: 'right',
                                top: 'center',
                                feature: {
                                    dataView: {readOnly: false},//点击侧边栏工具弹出的数据视图是否不可编辑
                                    restore: {},//配置项还原
                                    saveAsImage: {}//保存为图片
                                }
                            },
                            visualMap: {
                                type: 'piecewise',
                                pieces: [
                                    {min: 60}, // 不指定 max，表示 max 为无限大（Infinity）。
                                    {min: 40, max: 50},
                                    {min: 30, max: 40},
                                    {min: 20, max: 30},
                                    {min: 10, max: 20},
                                    {max: 5}     // 不指定 min，表示 min 为无限大（-Infinity）。
                                ],
                                inRange: {
                                    color: ['#FFFFFF', '#B80909']//数据色彩
                                }
                            },
                            series: [
                                {
                                    name: '中国地图',
                                    type: 'map',
                                    mapType: 'china', // 自定义扩展图表类型
                                    zoom: 1.5, //当前视角的缩放比例
                                    roam: true, //是否开启平游或缩放
                                    itemStyle: {
                                        areaColor: '#ffffff',
                                        emphasis: { label: { show: false } },
                                        normal: { label: { show: false } }
                                    },
                                    scaleLimit: { //滚轮缩放的极限控制
                                        min: 1,
                                        max: 10
                                    },
                                    label: {
                                        show: true
                                    },
                                    data: [
                                        {name: '河南省', value: 60, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                        {name: '山东省', value: 40, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                        {name: '江西省', value: 40, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                        {name: '甘肃省', value: 40, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'},
                                        {name: '浙江省', value: 40, number: '代理商数量', schoolNumber: "学校数量", active: '活跃值'}
                                        // {name: '中西区', value: 20057.34},
                                        // {name: '湾仔', value: 15477.48},
                                        // {name: '东区', value: 31686.1},
                                        // {name: '南区', value: 6992.6},
                                        // {name: '油尖旺', value: 44045.49},
                                        // {name: '深水埗', value: 40689.64},
                                        // {name: '九龙城', value: 37659.78},
                                        // {name: '黄大仙', value: 45180.97},
                                        // {name: '观塘', value: 55204.26},
                                        // {name: '葵青', value: 21900.9},
                                        // {name: '荃湾', value: 4918.26},
                                        // {name: '屯门', value: 5881.84},
                                        // {name: '元朗', value: 4178.01},
                                        // {name: '北区', value: 2227.92},
                                        // {name: '大埔', value: 2180.98},
                                        // {name: '沙田', value: 9172.94},
                                        // {name: '西贡', value: 3368},
                                        // {name: '离岛', value: 806.98}
                                    ],
                                    // 自定义名称映射
                                    // nameMap: {
                                    //     'Central and Western': '中西区',
                                    //     'Eastern': '东区',
                                    //     'Islands': '离岛',
                                    //     'Kowloon City': '九龙城',
                                    //     'Kwai Tsing': '葵青',
                                    //     'Kwun Tong': '观塘',
                                    //     'North': '北区',
                                    //     'Sai Kung': '西贡',
                                    //     'Sha Tin': '沙田',
                                    //     'Sham Shui Po': '深水埗',
                                    //     'Southern': '南区',
                                    //     'Tai Po': '大埔',
                                    //     'Tsuen Wan': '荃湾',
                                    //     'Tuen Mun': '屯门',
                                    //     'Wan Chai': '湾仔',
                                    //     'Wong Tai Sin': '黄大仙',
                                    //     'Yau Tsim Mong': '油尖旺',
                                    //     'Yuen Long': '元朗'
                                    // }
                                }
                            ]
                        },true);
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: #FFFFFF;
  }
</style>
