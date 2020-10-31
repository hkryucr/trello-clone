<template>
  <div class="atlaskit-portal-container" style="display: flex;">
    <div class="atlaskit-portal" style="z-index: 1;">
      <section class="_3aCMXlRGLNlRiL _11TSwgmUkKFvi9 js-react-root" data-elevation="1" style="position: fixed; width: 600px; will-change: top, left; top: 44px; left: 190px;;">
        <div tabindex="-1" class="_1ArtKJZLTN_ljN" style="max-height: 929px;">
          <div class="_2qAhBotzZJDWpK">
            <section v-if="!searchInput.length && !getSearchResult.length" class="_1luI_RCj-NvNUa before-search">
              <div class="_2kZPe8bLxh7VDx">Searches</div>
              <hr class="muh5vQ3i3GUU8A">
              <div>Refine your search for boards and tasks</div>
            </section>
            <section v-if="searchInput.length && !getSearchResult.length" class="_1luI_RCj-NvNUa before-search">
              <div class="_2kZPe8bLxh7VDx">Searches</div>
              <hr class="muh5vQ3i3GUU8A">
              <div v-if="!getSearchResult.length && true">We couldn't find any cards or boards that matched your search.</div>
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
              <div v-if="getSearchResult.length" class="_2kZPe8bLxh7VDx">Boards</div>
              <ul class="_25qVpdeW8QY-I0">
                <li v-for="(item, $index) in getSearchResult" :key="$index">
                  <div class="_1fp0H2u2NFTsxl">
                    <a href="/b/wgsypvon/asdfasdfasdfafsd" class="_1-xqt-RbCBt-Sv" title="asdfasdfasdfafsd">
                    <div class="_26ZVKC32nK5LUz" style="background-image: url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x321/de7b6f8b5d2762534f8fb641763b8ebf/photo-1600849562126-d4670368803e.jpg'); background-color: rgb(243, 243, 244);"></div>
                    <div class="_3ip-7S5md5RzJ-" style="background-image: url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x321/de7b6f8b5d2762534f8fb641763b8ebf/photo-1600849562126-d4670368803e.jpg'); background-color: rgb(243, 243, 244);"></div>
                    <div class="_2o1voqefI-Jq7G">
                      <div class="_2sW4tjfiXjrots _3kPuB_9ssJHK2z">{{item.name}}</div>
                    </div>
                  </a>
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
    ...mapGetters(['getSearchResult'])
  },
  props: ['searchInput']
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
  overflow: hidden;
  padding: 0;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
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
</style>
