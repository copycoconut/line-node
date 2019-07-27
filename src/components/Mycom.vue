<template>
    <v-stage ref="stage" :config="stageSize"
                          @mousemove="handleMouseMove"
                          @mouseout="handleMouseOut"
    >
      <v-layer ref="layer">
        <v-regular-polygon :config="polygon01"/>
        <v-text ref="text" :config="{
          x: 10,
          y: 10,
          fontFamily: 'Calibri',
          fontSize: 20,
          text: text,
          fill: 'black'
        }" />
        <v-text ref="panal" :config="{x: 180, y: 10,fontSize: 24,text: panalgap,fill: 'black',fontFamily: 'Calibri'}"/>
        <v-line v-for="item in linegap" :key="item.id" :config="item"></v-line>
        <v-text v-for="item in textgap" :key="item.id" :config="item"></v-text>
      </v-layer>
    </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
let panalGapChannel = 100;//จำนวนช่องทั้งหมดที่แสดงในpanal
let gapline = {};
let gaptext = {};

export default {
  data() {
    return {
      posx: '',
      posx: '',
      polygon01:{
        x: 120,
        y: 190,
        sides: 3,
        radius: 80,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4
      },
      stageSize: {
        width: width,
        height: height
      },
      text: '',
      panalgap: '',
      linegap: [],
      textgap:[]
    };
  },
  methods: {
    writeMessage(message) {
      //ฟังชั่นเขียนตำแหน่ง x y ลงบนแคนวาส ผ่านtag text
      this.text = message;
    },
    handleMouseOut(event) {
      this.writeMessage('Mouseout Stage');
      //this.panalGapMake(panalGapChannel,width);
    },
    handleMouseMove(event) {
      //ฟังชั่นหาตำแหน่งเม้า
      const mousePos = this.$refs.stage.getStage().getPointerPosition();
      this.posx = mousePos.x ;
      this.posy = mousePos.y ;
      this.writeMessage('x: ' + this.posx + ', y: ' + this.posy);
      //this.panalGapMake(panalGapChannel,width);
    },
    panalGapMake(panalGapChannel,width){
        //คำนวนหาช่องว่างระหว่าช่อง
        const Gap = width/panalGapChannel;
        const newGap = Math.floor(Gap);
        this.panalgap = newGap;
    }
  },
  mounted() {
      gapline = this;
      gaptext = this;
      const panalgap = this.panalGapMake(panalGapChannel,width);
      let xgap = 0;
      let stroke_color = "red";//สีเส้นpanalgap
      for (let n = 1; n < panalGapChannel; n++) {
        xgap = xgap+this.panalgap;
        let n_mod = n % 5;
        if(n_mod == 0){
          stroke_color = "red";
          gaptext.textgap.push({
            x: xgap,
            y: 30,
            fontFamily: 'Calibri',
            fontSize: 12,
            text: n,
            fill: 'black',
            draggable: false
          });
        }else{
          stroke_color = "black";
        }
        gapline.linegap.push({
          x: xgap,
          y: 40,
          points: [0,0,0,15],
          stroke: stroke_color,
          draggable: false,
        });
      }
  }
};
</script>
