<template>
  <div class="talion-view">
    <div class="header-bar">
      <div class="topbar">
        <div class="close-talion icon" @click="closeTalion">
          &#xe8b5;
        <div calss="mytitle">搜索</div>
        </div>
      </div>
      <form class="search" onsubmit="return false">
        <input
          type="search"
          name="query"
          v-model.trim.lazy="queryStr"
          @keyup.enter="goSearch()">
      </form>
    </div>
    <ul class="has-header">
      <li>
        <span>热门餐厅</span>
      </li>
      <li>
        <span>热门评论</span>
      </li>
      <li>
        <span>韩式料理</span>
      </li>
      <li>
        <span>杭帮菜系</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ReturnBar from '../components/ReturnBar'

export default {
  name: 'talion-view',
  components: { ReturnBar },
  data () {
    return {
      queryStr: ''
    }
  },
  methods: {
    closeTalion: function () {
      this.$emit('closeTalion')
    },
    /**
     * Going to search view
     * params: q
     */
    goSearch: function () {
      this.$emit('closeTalion')
      this.$router.push({
        name: 'SearchView',
        params: {
          q: this.queryStr
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.talion-view {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
  .topbar{
    width: 100%;
    height: 4rem;
    background:  #00b600;
    div{
      color: #fff;
      font-size: 2rem;
      padding: 1rem 0 0 2rem;
      .mytitle{
        color: #fff;
        font-size: 1.6rem;
        padding: 0;
      }
    }
    
  }
}

.close-talion {
  color: #42bd56;
  font-size: 1.6rem;
}

.search {
  flex: 1;
  margin-top: 2rem;
  width: 88%;
  padding: 0 2rem;
}

input[type=search] {
  box-sizing: border-box;
  border: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBTUEAALGPC/xhBQAABUlJREFUaAXdWT1oHEcU1unHR8ih0lZEKsWVkSrLkFaVQIYkJ93JBBUp0hm7sdMJbOlAnR0ICDdJk4AL6++wi8PChXAXMG6CMSmSTpZlFy7EmWBLQvm+5c3ydrTam9nblXQeWM2bN/N+vntvZ2afuro+sVZoB0+9Xv9qd3f3W+i4WCgUBg8ODgZB82HbAm8LvC3Qz/v6+h6Wy+V/g5kc/3gDWltbO7u/v38Njpbh17Cnby8Ast7T07M4OTn51lPWabkzoKWlpRKcuQkgP0FzyUn70Yua0HUHuu5OT083j17mP+MEaHl5eRLG70H9OX8TiRJvAOxqtVpdS1zlMZkICCAKKysrt6DvNukYvR/B24BTj9C/RCpt7e3t8Z3p6u3tHURq8n26ANlv0I/hOYMn0iB7AMZ8pVKpCR2Z9x3EORnoQIp9BuIPPJUYpdvg1Uql0v2JiYmdmPlDrEaj0d9sNmcwwR9owF4AMMsA/gNS8D97zmccC4jRQJotQVEEDIx+AG+hv7//5/Hx8fc+hsza9fX1z3d2dm5gPAs7RcNnT1CI1JV2IhULCGBuw9icNgZ6GylVnpqa+tPipxqurq5+jZSsQzgSLYCZwzs1n0ophA4B4gYA/gqjZJTCyF/d3d2XAWbT8LLoAepLgGpA14jRJ9GppN0oQqepkFszun/w6N2MkbmUNRjaYxNQz0DqSL3B+HyaLb2bSk3Dr3MTdAgG4w+SZplGxthjzx+KNmhL8c+JL4rlRoaAeANAmvHQ1G0hq3dGK7VpsbGg+fSFPmmeCx0CQi5fh4C+AWxzN3NRksUascXjwLQSfLpmBq59CAi/yHeWUC3t1mzpcRqKrZpeDJ94X/RqASDemiE1rCQ/8tBU42MhxSZvH6YNi29m3LIPAMkngF684XoD0ELt0mJzQ+uJ8U1PH6JNyl3UM9hheDc7kRZjO+JbK6cCQFBiPsrM+peGOIE+YjvGt0SXAkB4+SKAcC4EN+ZEyZwmbdu2b63MmpSLADKfAK2E85iPsR3xrZVNk3L8JglbsViMXInCiWMgYmx7+WJS7rX2FQfaF3p8nHSMba/ag4lQ5J2BUq8wZwk4xjYvqs7NRCgCCNIXnDVkv9C2/crHRAAIAs+1EHYW1gBOpNm2sW0/9XEkAMQioCU0xhqAxct9KDbHtCEAeqLHregAkFQ0X6jFZ6SgoVj5k2IzrAwBzCZqDH/7WDYpxwIFv+91u8WChmbkSYstVoTChvT7NRw4EiEgnNCLkGkquQGpzihWfqTY0p/hrCrRJ68WAmKtGVG6Y0nPsjpj8TIfio1ZS/FvqCm8s3gthyEgrkSI76IL932MizgX6ixktNSUcoEUSeq0pVTwGKmpsTMZAcQqC6J0FY++Cg0AVCMPUAKGZSydanT+xzTRoWAEEBlSD5snrdoIQD2DA5mlH3VRJ2yENTmx9whgHivbXmTsxQ/hZ5H+Afqq1obI5VoKFlv76GcA6oG27UrHAqIwi/UA8LsNShRnXqy3HE4N6khANCCRyvXfKQKEn/yX8fTImF0qUImAjPIc/+HF3YwbwGNkxBXQrDS1BerQpmBA6F42ivNIwTnw9eGrl/nQPDR/wTNiNgB5Z2bAY2RMI7j7AtbwEnunCGkN7fzTGD/IJtKY15lFAIg9NNuNlDcgDS7h3/rUyy9NHtKvAOQpnieuF812QLUFSIPLmk4L6tQC4g+UBtSpBpQG1KkH5AuqIwD5gOoYQK6gOgqQCyinmwIVnZaWcKMIvgw6DhB/WBsUDu2HQ0ND33Ou41KOTpsm51SVYEZHR3cN/5Pq/wfEdlFyq1lD2AAAAABJRU5ErkJggg==) no-repeat 50% #f3f3f3;
  background-size: 1.73rem;
  border-radius: 0.3rem;
  width: 100%;
  height: 3.2rem;
  font-size: 1.4rem;
}

input[type=search]:focus {
  background: #f3f3f3;
}

ul {
  display: flex;
  margin-top: 1rem;

  li {
    width: 90%;
    margin: 2rem 2rem;
    border-bottom: 1px solid rgb(235, 234, 234);
    span {
      display: block;
      color: #999;
      height: 1.7rem;
      font-size: 1.2rem;
      letter-spacing: 0.1rem;
    }
  }
}

</style>
