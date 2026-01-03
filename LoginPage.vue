<template>
  <div class="login-container">
    <div class="login-box">
      <h2 style="text-align:center">Login</h2>

      <form @submit.prevent="login">
        <div class="input-group">
          <label>Username</label>
          <input v-model="username" placeholder="Masukkan username" />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Masukkan password" />
        </div>

        <button class="login-btn">Login</button>
      </form>

      <p>Belum punya akun?
        <a @click="$router.push('/RegisterPage')">Daftar di sini</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async login() {
      if (!this.username || !this.password) {
        alert("Username dan Password wajib diisi");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          alert("Server mengembalikan error: " + response.status);
          return;
        }

        const result = await response.json();

        if (result.status === true) {
          alert(result.message || "Login berhasil");

          // simpan user di untuk dashboard
          localStorage.setItem("user", JSON.stringify(result.user));

          this.$router.push("/dashboard");
        } else {
          alert(result.message || "Login gagal");
        }

      } catch (error) {
        console.error("Login Error:", error);
        alert("Tidak bisa konek ke server.");
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #9cf7ae;
}

.login-box {
  background-color: #dd5454;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.input-group {
  margin-bottom: 10px;
}

.input-group label {
  display: block;
  margin-bottom: 10px;
}

.input-group input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #3e8e41;
}

a {
  color: #4CAF50;
  cursor: pointer;
}
</style>
