<template>
  <div id="login-page">
    <div class="login-panel">
      <div class="login-bg"><span>后台管理系统</span></div>
      <el-form
        ref="accountRef"
        :model="account"
        status-icon
        :rules="rules"
        label-width="7.5rem"
        class="login-account"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="account.name" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="account.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import { rules } from '@/config/account-config'
import { useStore } from 'vuex'
import type { FormInstance } from 'element-plus'
import { test } from '@/service/test'
export default defineComponent({
  setup() {
    const accountRef = ref<FormInstance>()

    const store = useStore()

    const account = reactive({
      name: 'coderwhy',
      password: '123456'
    })
    const login = () => {
      accountRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('loginStore/LoginAction', { ...account })
        }
      })
    }
    return {
      accountRef,
      account,
      rules,
      login
    }
  }
})
</script>

<style scoped lang="less">
#login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
.login-panel {
  width: 56.25rem;
  box-shadow: 0 0.875rem 1.6875rem rgb(0 0 0 / 25%), 0 0.6875rem 0.6875rem rgb(0 0 0 / 22%);
  display: flex;
  background-color: rgba(255, 0, 0, 0);
  height: 25rem;
  border-radius: 1.25rem;
  align-items: center;
}
.login-bg {
  width: 50%;
  background: #e9e9e9;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    background: #095c91;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
    padding: 14px 15px;
    border-radius: 20px;
  }
}
</style>
