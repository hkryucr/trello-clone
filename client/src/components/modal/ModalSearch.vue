<template>
  <div class="atlaskit-portal-container" style="display: flex;">
    <div class="atlaskit-portal" style="z-index: 1;">
      <section class="_3aCMXlRGLNlRiL _11TSwgmUkKFvi9 js-react-root" data-elevation="1" style="position: fixed; width: 600px; will-change: top, left; top: 44px; left: 190px;;">
        <div tabindex="-1" class="_1ArtKJZLTN_ljN" style="max-height: 929px;">
          <div class="_2qAhBotzZJDWpK">
            <section v-if="getState === 'noInput'" class="_1luI_RCj-NvNUa before-search">
              <div class="_2kZPe8bLxh7VDx">Searches</div>
              <hr class="muh5vQ3i3GUU8A">
              <div>Refine your search with regex operators like ' . ' , ' * ' , and 'memo'.</div>
            </section>
            <section v-if="getState === 'noResult'" class="_1luI_RCj-NvNUa before-search">
              <div class="_2kZPe8bLxh7VDx">Searches</div>
              <hr class="muh5vQ3i3GUU8A">
              <div>We couldn't find any cards or boards that matched your search.</div>
            </section>
            <section v-if="getState === 'loading'" class="_1luI_RCj-NvNUa before-search">
              <!-- <div class="_2kZPe8bLxh7VDx">Searches</div> -->
              <hr class="muh5vQ3i3GUU8A">
              <div class="flex flex-col justify-center align-center">
                <div style="text-align: center; margin-bottom: 1rem">SEARCH DATA BEING LOADED</div>
                <img src="../../assets/svg-loaders/three-dots.svg"/>
              </div>
            </section>
            <!-- <div class="_1tZa9wiJrnTFXJ">
              <div class="_2yrcsjyci0RjVT">
                <div class="_22yOOIXSqY7ut7">
                  <div class="_1JRn_bFYZD9y54">Refine your search with operators like @member, #label, is:archived, and has:attachments.</div>
                </div>
                <button class="_2X-J1ljNLs6ATR">Learn more</button>
              </div>
            </div> -->
            <section class="_1luI_RCj-NvNUa">
              <div v-if="getSearchResultBoards.length" class="_2kZPe8bLxh7VDx">Boards</div>
              <ul class="_25qVpdeW8QY-I0">
                <li v-for="(curBoard, $index) in getSearchResultBoards" :key="$index">
                  <div class="_1fp0H2u2NFTsxl">
                    <router-link :to="`/board/${curBoard.boardId}`" class="_1-xqt-RbCBt-Sv" :title="`${curBoard.name}`">
                      <div class="_26ZVKC32nK5LUz" :style="insertBackground(curBoard)"></div>
                      <div class="_3ip-7S5md5RzJ-" :style="insertBackground(curBoard)"></div>
                      <div class="_2o1voqefI-Jq7G">
                        <div class="_2sW4tjfiXjrots _3kPuB_9ssJHK2z">{{curBoard.name}}</div>
                      </div>
                    </router-link>
                  </div>
                </li>
              </ul>
            </section>
            <section class="_1luI_RCj-NvNUa">
              <div v-if="getSearchResultTasks.length" class="_2kZPe8bLxh7VDx">Tasks</div>
              <ul class="_2D51jmbvu4f_Nx" style="min-height: 0px">
                <li v-for="(curTask, $index) in getSearchResultTasks" :key="$index" class="_3ZHW8sRWeDebce" style="max-width: 100%">
                  <div class="_1I2bHC5OCLUBmu">
                    <div class="_2cmBd7gM0NLK7q">
                      <router-link :to="`/board/${curTask.board._id}/task/${curTask.taskId}`" class="_172nZG1kck9ovt"></router-link>
                      <div class="_3qyS0qUsS-VZpY">
                        <div class="kbyD4YtX9f__Fj">{{curTask.name}}</div>
                      </div>
                    </div>
                    <div class="_2LlqX5oXojKxky">
                      <router-link :to="`/board/${curTask.board._id}/task/${curTask.taskId}`" class="KNAq7Q4nceUrmV">{{curTask.name}}</router-link>
                      <div class="_3oYLCroL1JOcbq">
                        in <strong>{{curTask.board.name}}</strong> on <span><strong>{{curTask.column.name}}</strong></span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getSearchResultBoards', 'getSearchResultTasks', 'getSearchResultLoaded']),
    getState () {
      if (this.searchInput.length === 0) {
        return 'noInput'
      } else if (!this.getSearchResultBoards.length && !this.getSearchResultTasks.length && !this.getSearchResultLoaded) {
        return 'loading'
      } else if (!this.getSearchResultBoards.length && !this.getSearchResultTasks.length) {
        return 'noResult'
      } else {
        return 'loaded'
      }
    }
  },
  props: ['searchInput'],
  methods: {
    insertBackground (curBoard) {
      return `${(curBoard.background.backgroundType === 'color') ? ('background-color:' + curBoard.background.template) : ('background-image: url(' + curBoard.background.template + ');')}`
    }
  },
  mounted () { console.log(this.$router, 'this.$router') },
  watch: {
    '$route' (to, from) {
      if (to !== from) location.reload()
    }
  }
}
</script>

<style>
._3aCMXlRGLNlRiL {
    color: #172b4d;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    box-sizing: border-box;
    outline: 0;
    overflow: hidden;
}
._11TSwgmUkKFvi9 {
    background-color: #f4f5f7;
}
._1ArtKJZLTN_ljN {
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translateZ(0);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 12px;
    width: 100%;
    outline: none;
}
._2qAhBotzZJDWpK {
    position: relative;
}
/* above this - previous code */
._1luI_RCj-NvNUa {
  margin-bottom: 9px;
  padding-top: 3px;
}
._2kZPe8bLxh7VDx {
  color: #5e6c84;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  margin-top: 16px;
  font-weight: 500;
  letter-spacing: .04em;
  margin: 3px 0 9px;
  text-transform: uppercase;
}
._3aCMXlRGLNlRiL, ._25qVpdeW8QY-I0 {
  display: flex;
  flex-wrap: wrap;
}
._3aCMXlRGLNlRiL li, ._25qVpdeW8QY-I0 li {
  flex-basis: 50%;
  max-width: 50%;
}
._1fp0H2u2NFTsxl {
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
  margin: 0 4px 4px 0;
  min-width: 0;
}
._1-xqt-RbCBt-Sv {
  display: flex;
  font-weight: 700;
  height: 36px;
  /* overflow: hidden; */
  padding: 0;
  position: relative;
  text-decoration: none;
  /* -webkit-user-select: none; */
  /* user-select: none; */
  /* -webkit-user-drag: none; */
}
._26ZVKC32nK5LUz {
  background-size: cover;
  background-position: 50%;
  position: absolute;
  width: 100%;
  height: 36px;
  opacity: 1;
  border-radius: 3px;
}
._26ZVKC32nK5LUz:before {
  background: #fff;
  bottom: 0;
  content: "";
  left: 0;
  opacity: .88;
  position: absolute;
  right: 0;
  top: 0;
}
._3ip-7S5md5RzJ- {
  display: inline-block;
  flex: 0 0 auto;
  background-size: cover;
  border-radius: 3px 0 0 3px;
  height: 36px;
  width: 36px;
  position: relative;
  opacity: .7;
}
._2o1voqefI-Jq7G {
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  padding: 9px 0 9px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
._1-vN8NL177VLaD, ._2sW4tjfiXjrots {
  display: block;
  padding-right: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
._2sW4tjfiXjrots {
  color: #172b4d;
  font-weight: 400;
}
._3kPuB_9ssJHK2z {
  font-weight: 700;
}
._2TWsag6OcNDMUh {
    width: 0;
    transition-duration: 85ms;
    transition-property: width;
    overflow: hidden;
    display: flex;
}
._2D51jmbvu4f_Nx {
  list-style-type: none;
  padding: 0;
}
._3ZHW8sRWeDebce {
  position: relative;
}
._1I2bHC5OCLUBmu {
  align-content: center;
  display: flex;
}
._2cmBd7gM0NLK7q {
  flex-basis: 200px;
  min-height: 72px;
  min-width: 200px;
  overflow: hidden;
  position: relative;
}
._2LlqX5oXojKxky {
  padding: 0 0 32px 12px;
}
._172nZG1kck9ovt {
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: 200px;
  z-index: 15;
}
._3IoGJwJaen4Vaq {
  position: absolute;
  transition: opacity 85ms,transform 85ms;
}
._2kkT-Lhc7Rnxuf {
  background-color: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0 1px 0 0 rgba(9,30,66,.25);
  display: block;
  padding-bottom: 6px;
  position: relative;
  overflow: hidden;
  width: 232px;
}
._3qyS0qUsS-VZpY {
  display: inline-block;
  position: relative;
  background: hsla(0,0%,100%,.7);
  width: 100%;
  z-index: 10;
}
.kbyD4YtX9f__Fj {
  color: #172b4d;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  padding: 6px 8px 6px 8px;
  word-wrap: break-word;
}
.KNAq7Q4nceUrmV {
  color: #172b4d;
  display: block;
  font-weight: 700;
  text-decoration: none;
  word-wrap: break-word;
}
._3oYLCroL1JOcbq {
  color: #5e6c84;
}
</style>
