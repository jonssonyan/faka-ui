<template>
    <el-form ref="registerRef" :model="registerForm" label-width="80px" :rules="registerRules">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="reset">重设</el-button>
            <el-button @click="toLogin">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                registerForm: {},
                registerRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            register() {
                this.$refs.registerRef.validate(async valid => {
                    if (!valid) return;
                    let {data: res} = this.$http.post('/register');
                    if (res.code !== 1) {
                        this.$message.error(res.msg)
                    } else {
                        this.$message.success('注册成功');
                        await this.$router.push('/login')
                    }
                })
            },
            reset() {
                this.$refs.registerRef.resetFields();
            },
            toLogin() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="less">

</style>
