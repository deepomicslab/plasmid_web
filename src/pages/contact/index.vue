<template>
    <div class="flex flex-col w-full justify-start items-center">
        <div class="flex flex-row w-full bg-[#f8f9fa] justify-center items-center">
            <div class="h-250 w-360 flex flex-row">
                <div class="w-180 flex flex-col justify-start items-center">
                    <div class="flex flex-row">
                        <div class="mr-5">
                            <el-image
                                class="mt-7"
                                src="/png/plasmid.png"
                                style="width: 60px; height: 60px"
                            ></el-image>
                        </div>

                        <div class="text-5xl font-700 text-[#3e5294] mt-10">Our Team</div>
                    </div>
                    <div style="box-shadow: 0 0 64px #cfd5db" class="w-150 h-170 mt-15">
                        <div
                            class="text-[21px] px-19.5 py-16 leading-12 mt-5 text-justify text-gray-700"
                        >
                            We are a diverse team of talented research assistants, Ph.D. candidates,
                            and assistant investigators, led by Prof. LI Shuai Cheng at the City
                            University of Hong Kong and Prof. CHEN Yu at the Shenzhen Institute of
                            Advanced Technology. Our team comprises individuals with extensive
                            molecular biology, bioinformatics, and computer science expertise. If
                            you have any inquiries or require further information, please feel free
                            to reach out to us at
                            <strong class="text-[#069] font-400 mx-1 text-[21px]">
                                shuaicli@gmail.com
                            </strong>
                            or
                            <strong class="text-[#069] font-400 mx-1 text-[21px]">
                                yu.chen@siat.ac.cn
                            </strong>
                            .
                        </div>
                    </div>
                </div>
                <div class="w-160 flex flex-col justify-start items-center ml-15">
                    <div class="text-3xl font-500 text-[#3e5294] mt-10">PI</div>
                    <div class="flex flex-row justify-around w-160 mt-5">
                        <div class="flex flex-col justify-center items-center">
                            <el-avatar shape="circle" :size="150" fit="fill" src="/png/lsc.jpg" />
                            <div class="mt-3 text-lg font-500">LI Shuai Cheng</div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <el-avatar
                                shape="circle"
                                :size="150"
                                fit="fill"
                                src="/png/cy.jpg"
                                style="background-color: #fff"
                            />
                            <div class="mt-3 text-lg font-500">CHEN Yu</div>
                        </div>
                    </div>
                    <div class="text-3xl font-500 text-[#3e5294] mt-10">Team</div>
                    <div class="flex flex-row justify-around w-160 mt-5">
                        <div class="flex flex-col justify-center items-center">
                            <el-avatar
                                shape="circle"
                                :size="150"
                                fit="fill"
                                src="/png/lyh.png"
                                style="background-color: #fff"
                            />
                            <div class="mt-3 text-lg font-500">Li Yinhu</div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <el-avatar
                                shape="circle"
                                :size="150"
                                fit="fill"
                                src="/png/fxk.jpg"
                                style="background-color: #fff"
                            />
                            <div class="mt-3 text-lg font-500">Feng Xikang</div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-around w-160 mt-5">
                        <div class="flex flex-col justify-center items-center">
                            <el-avatar shape="circle" :size="150" fit="fill" src="/png/cxh.jpg" />
                            <div class="mt-3 text-lg font-500">Chen Xuhua</div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <el-avatar shape="circle" :size="150" fit="fill" src="/png/ys.jpg" />
                            <div class="mt-3 text-lg font-500">YANG Shuo</div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-around w-160 mt-5">
                        <div class="flex flex-col justify-center items-center">
                            <el-avatar
                                shape="circle"
                                :size="150"
                                fit="cover"
                                src="/png/zzc.jpg"
                                style="background-color: rgb(154, 207, 250)"
                            />
                            <div class="mt-3 text-lg font-500">Zhao Zicheng</div>
                        </div>
                        <!-- <div class="flex flex-col justify-center items-center">
                            <el-avatar shape="circle" :size="150" fit="cover" src="/png/xzx.jpg" />
                            <div class="mt-3 text-lg font-500">XU Zixin</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
