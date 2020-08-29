<template>
  <div class="md">
    <mavon-editor style="height: 100%;width: 100%;"
                  v-model="content"
                  ref="md"
                  defaultOpen="edit"
                  :toolbars="toolbarsValue"
                  @imgAdd="$imgAdd"
                  @change="changeMavon"
                  @save="saveMavon" />
  </div>
</template>

<script>

  import {mavonEditor} from 'mavon-editor'
  import  'mavon-editor/dist/css/index.css'

  export default {
    name: "Markdown",
    data(){
      return {
        /*md配置*/
        toolbarsValue: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        content:"",
        contentHTML:''
      }
    },
    components:{
      mavonEditor
    },
    methods:{
      /*富文本保存的方法*/
      saveMavon(value,render){},
      /*绑定@imgAdd event*/
      $imgAdd(pos, $file){},
      /*状态改变*/
      changeMavon(){
        this.$emit('md-child',this.$refs.md.d_render)
      }
    }
  }
</script>

<style scoped>
  .v-note-wrapper{
    min-width: 0 !important;
  }
</style>