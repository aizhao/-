<template>
    <div class="icp">{{`© ${year} ${author} ` }}<a href="http://beian.miit.gov.cn/" target="_blank">{{ record }}</a></div>
</template>

<script setup>
let year = new Date().getFullYear();        // 一般都是最新的一年
let author = 'Zhaoai';					// 作者名
let record = '蜀ICP备2024055932号';			// 备案号
</script>

<style>
.icp {
	margin: 10px 0;
	width: 100%;
	height: 36px;
	white-space: pre;
	text-align: center;
	color: gray;
	z-index: 1000;
}
.icp > a {
    color: gray;
    text-decoration: none;
}
.icp > a:hover {
    color: aqua;
    text-decoration: none;
}
</style>
