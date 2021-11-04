<template>
  <div class="index-components">
    <ol>
      <ul>
        <router-link to="/register" custom v-slot="{ href }" v-if="!isDriver">
          <a :href="href">
            <li>
              <a>
                <img src="@/assets/register.png" alt="" />
              </a>
              <span>注册成为司机</span>
              <nut-icon size="14px" color="#979797" name="right"></nut-icon>
            </li>
          </a>
        </router-link>
        <router-link to="/OrderList" custom v-slot="{ href }" v-if="isDriver">
          <a :href="href">
            <li>
              <a>
                <img src="@/assets/waiting.png" alt="" />
              </a>
              <span>待处理订单</span>
              <nut-icon size="14px" color="#979797" name="right"></nut-icon>
            </li>
          </a>
        </router-link>
        <router-link to="/historyList" custom v-slot="{ href }" v-if="isDriver">
          <a :href="href">
            <li>
              <a>
                <img src="@/assets/orderQuery.png" alt="" />
              </a>
              <span>历史订单</span>
              <nut-icon size="14px" color="#979797" name="right"></nut-icon>
            </li>
          </a>
        </router-link>
        <router-link to="/aboutme" custom v-slot="{ href }" v-if="isDriver">
          <a :href="href">
            <li>
              <a>
                <img src="@/assets/acount.png" alt="" />
              </a>
              <span>司机信息</span>
              <nut-icon size="14px" color="#979797" name="right"></nut-icon>
            </li>
          </a>
        </router-link>
      </ul>
    </ol>
  </div>
</template>
<script lang="ts">
import introduction from "/src/components/introduction.vue";
import { defineComponent, onMounted, ref, computed } from "vue";
import { checkIsDrv } from "@/request/api";

export default defineComponent({
  name: "home",
  components: {
    introduction,
  },
  setup() {
    let driverIndo = ref({});
    onMounted(async () => {
      driverIndo.value = await checkIsDrv({
        user_token: "f17521b620d536f642d80b7e9bdb643e",
      });
    });
    const isDriver = computed(() => {
      console.log(JSON.stringify(driverIndo.value));
      return JSON.stringify(driverIndo.value) !== "[]";
    });
    return { driverIndo, isDriver };
  },
});
</script>
