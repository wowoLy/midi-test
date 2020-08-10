<template>
  <div class="piano-wrap">
    <div @mousedown="pianoMouseDown($event)" @mouseup="pianoMouseUp($event)" class="piano-first">
      <div :data-pianoKey="1" :class="{pianoActive:activeKey['piano1']}"></div>
      <span :data-pianoKey="2" :class="{pianoActive:activeKey['piano2']}"></span>
      <div :data-pianoKey="3" :class="{pianoActive:activeKey['piano3']}"></div>
    </div>
    <div class="piano-middle" @mousedown="pianoMouseDown($event)" @mouseup="pianoMouseUp($event)" v-for="i in 7">
      <div :data-pianoKey="i*12-8" :class="{pianoActive:activeKey['piano'+(i*12-8)]}"></div>
      <span :data-pianoKey="i*12-7" :class="{pianoActive:activeKey['piano'+(i*12-7)],black1:true}"></span>
      <div :data-pianoKey="i*12-6" :class="{pianoActive:activeKey['piano'+(i*12-6)]}"></div>
      <span :data-pianoKey="i*12-5" :class="{pianoActive:activeKey['piano'+(i*12-5)],black2:true}"></span>
      <div :data-pianoKey="i*12-4" :class="{pianoActive:activeKey['piano'+(i*12-4)]}"></div>
      <div :data-pianoKey="i*12-3" :class="{pianoActive:activeKey['piano'+(i*12-3)]}"></div>
      <span :data-pianoKey="i*12-2" :class="{pianoActive:activeKey['piano'+(i*12-2)],black3:true}"></span>
      <div :data-pianoKey="i*12-1" :class="{pianoActive:activeKey['piano'+(i*12-1)]}"></div>
      <span :data-pianoKey="i*12" :class="{pianoActive:activeKey['piano'+(i*12)],black4:true}"></span>
      <div :data-pianoKey="i*12+1" :class="{pianoActive:activeKey['piano'+(i*12+1)]}"></div>
      <span :data-pianoKey="i*12+2" :class="{pianoActive:activeKey['piano'+(i*12+2)],black5:true}"></span>
      <div :data-pianoKey="i*12+3" :class="{pianoActive:activeKey['piano'+(i*12+3)]}"></div>
    </div>
    <div @mousedown="pianoMouseDown($event)" @mouseup="pianoMouseUp($event)" class="piano-last">
      <div :data-pianoKey="88" :class="{pianoActive:activeKey['piano88']}"></div>
    </div>
  </div>
</template>

<script>
    // import pianoJson from '../../static/piano';

    export default {
        name: "piano",
        data() {
            return {
                scriptLoad: [],
                activeKey: {}
            }
        },
        created() {
            // console.log(pianoJson);
            this.scriptLoad=[];
            this.init();
        },
        mounted() {
            this.bindKeyboard()
        },
        methods: {
            bindKeyboard(){
                let that=this;
                document.onkeydown = function (e) {
                    let key = window.event.keyCode;
                    switch (key) {
                        case 81:
                            if (!that.activeKey['piano1']){
                                MIDI.noteOn(0, 21, 100);
                                that.$set(that.activeKey, 'piano1', true);
                            }
                            break;
                        case 87:
                            if (!that.activeKey['piano2']){
                                MIDI.noteOn(0, 22, 100);
                                that.$set(that.activeKey, 'piano2', true);
                            }
                            break;
                    }
                };
                document.onkeyup = function (e) {
                    e.preventDefault();
                    let key = window.event.keyCode;
                    console.log(key);
                    switch (key) {
                        case 81:
                            MIDI.noteOff(0, 21);
                            that.$set(that.activeKey, 'piano1', false);
                            break;
                        case 87:
                            MIDI.noteOff(0, 22);
                            that.$set(that.activeKey, 'piano2', false);
                            break;
                    }
                };
            },
            createJavascript(src) {
                const s = document.createElement('script'), that = this;
                s.type = 'text/javascript';
                s.src = src;
                s.onload = function () {
                    that.scriptLoad.push(src);
                    that.javascriptIsLoad();
                };
                document.body.appendChild(s);
            },
            init() {
                this.createJavascript('./static/inc/shim/Base64.js');
                this.createJavascript('./static/inc/shim/Base64binary.js');
                this.createJavascript('./static/inc/shim/WebAudioAPI.js');
                this.createJavascript('./static/inc/shim/WebMIDIAPI.js');

                // jasmid package
                this.createJavascript('./static/inc/jasmid/stream.js');
                this.createJavascript('./static/inc/jasmid/midifile.js');
                this.createJavascript('./static/inc/jasmid/replayer.js');

                this.createJavascript('./static/js/midi/audioDetect.js');
                this.createJavascript('./static/js/midi/gm.js');
                this.createJavascript('./static/js/midi/loader.js');
                this.createJavascript('./static/js/midi/plugin.audiotag.js');
                this.createJavascript('./static/js/midi/plugin.webaudio.js');
                this.createJavascript('./static/js/midi/plugin.webmidi.js');
                this.createJavascript('./static/js/midi/player.js');
                this.createJavascript('./static/js/midi/audioDetect.js');
                this.createJavascript('./static/js/util/dom_request_xhr.js');
                this.createJavascript('./static/js/util/dom_request_script.js');
            },
            javascriptIsLoad() {
                let that=this;
                if (this.scriptLoad.length == 17) {
                    MIDI.loadPlugin({
                        soundfontUrl: "./static/soundfont/",
                        instrument: "acoustic_grand_piano",
                        onprogress: function (state, progress) {
                            console.log(state, progress);
                        },
                        onsuccess: function () {
                            console.log('加载完成');
                        }
                    });
                    let player=MIDI.Player;
                    player.BPM=120;//调整播放速度
                    player.loadFile('./static/ZZZ.mid', ()=>{
                        console.log('音乐加载完成');
                        // player.timeWarp = 2;
                        console.log(player);
                        // player.start();
                    });
                    player.addListener((data)=>{
                        console.log(data);
                        if(data.message === 144){//按键按下
                            that.activate(data.note - 20)
                        }
                        if(data.message === 128){//按键抬起
                            that.deactivate(data.note - 20)
                        }
                    })
                }
            },
            activate(note) {
                note = Number(note);
                if(this.activeKey[note]){
                    this.deactivate(note);
                    this.$set(this.activeKey,'piano'+note,true)
                }else {
                    this.$set(this.activeKey,'piano'+note,true)
                }
            },
            deactivate(note) {
                note = Number(note);
                this.$delete(this.activeKey,'piano'+note)
            },
            pianoMouseDown(e) {
                if (e.target.localName === 'span' || e.target.localName === 'div') {
                    let target = e.target, key = target.getAttribute('data-pianoKey');
                    MIDI.noteOn(0, Number(key) + 20, 100);
                    this.$set(this.activeKey, 'piano' + key, true);
                    console.log(this.activeKey);
                    target.onmouseout = () => {
                        MIDI.noteOff(0, Number(key) + 20);
                        this.$set(this.activeKey, 'piano' + key, false);
                    }
                }
            },
            pianoMouseUp(e) {
                if (e.target.localName === 'span' || e.target.localName === 'div') {
                    let target = e.target, key = target.getAttribute('data-pianoKey');
                    MIDI.noteOff(0, Number(key) + 20);
                    this.$set(this.activeKey, 'piano' + key, false);
                }
            }
        }
    }
</script>

<style scoped>
  .piano-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    user-select: none;
  }

  .piano-first, .piano-middle, .piano-last {
    position: relative;
    display: flex;
  }

  .piano-first > div, .piano-middle > div, .piano-last > div {
    width: 1.923%;
    border: 1px solid #000000;
    border-radius: 0 0 3px 3px;
    padding-top: 100%;
  }

  .piano-first > span, .piano-middle > span, .piano-last > span {
    position: absolute;
    top: 0;
    background: #000000;
    border-radius: 0 0 3px 3px;
    padding-top: 55%;
  }

  .piano-first > span {
    padding-top: 192%;
  }

  .piano-first {
    width: 3.846%;
  }

  .piano-first > div {
    width: 50%;
  }

  .piano-first > span {
    width: 35.02%;
    left: 50%;
    margin-left: -17.51%;
    border: 1px solid #000000;
  }

  .piano-middle {
    width: 13.4615%;
  }

  .piano-middle > div {
    width: 14.2857%;
  }

  .piano-middle > span {
    width: 10%;
    border: 1px solid #000000;
  }

  .black1 {
    left: 9.5%;
  }

  .black2 {
    left: 23.5%;
  }

  .black3 {
    left: 52.5%;
  }

  .black4 {
    left: 66.5%;
  }

  .black5 {
    left: 80.5%;
  }

  .piano-last {
    width: 1.923%;
  }

  .piano-last > div {
    width: 100%;
  }

  .pianoActive {
    background: orange !important;
  }
</style>
