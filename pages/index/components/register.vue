<template>
  <div class="register">
    <nut-cell-group title="注册成为司机">
      <nut-input
        class="input"
        :require-show="true"
        label="名字"
        v-model="form.driver_name"
        placeholder="请输入您的姓名"
      />
      <nut-input
        class="input"
        :require-show="true"
        label="手机号"
        v-model="form.driver_tel"
        type="number"
        placeholder="请输入您的联系方式"
      />
      <nut-input
        class="input"
        :require-show="true"
        v-model="form.driver_sfz"
        label="身份证号"
        placeholder="请输入您的身份证号码"
      />
    </nut-cell-group>
    <div class="register_btn">
      <nut-button block type="info" @click="onSubmit">注册</nut-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import { resignAsDriver } from "@/request/api";
import { defineComponent, reactive,toRefs } from "vue";
export default defineComponent({
  setup() {
    const form = reactive({
      driver_name: "",
      driver_tel: "",
      driver_sfz: "",
    });
    const onSubmit = async () => {
      if (!form.driver_name) {
        Toast("请输入您的姓名");
        return;
      }
      if (!form.driver_tel) {
        Toast("请输入您的手机号码");
        return;
      }
      if (!form.driver_sfz) {
        Toast("请输入您的身份证号码");
        return;
      }
      try {
        await resignAsDriver({
          ...form
        });
        Toast.success("注册成功");
        history.back();
      } catch (err) {
        console.log(err);
      }
    };
    return {
      form,
      onSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
.register {
  padding: 0 20px 20px 20px;
  .input {
    padding: 15px;
  }
  .register_btn {
    margin-top: 25px;
  }
}
</style>
