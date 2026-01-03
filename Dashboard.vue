<template>
  <div class="dashboard-container">
    <div class="dashboard-box">
      <h2>Dashboard</h2>
      <p>Selamat datang</p>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },

  async mounted() {
    try {
      // Ambil user dari localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      } else {
        alert("Silakan login terlebih dahulu");
        this.$router.push("/LoginPage");
      }

      // Opsional: cek dashboard API CI4
      const response = await fetch("http://localhost:8080/api/dashboard");
      const result = await response.json();
      if (!result.status) {
        alert("Gagal akses dashboard");
        this.$router.push("/login");
      }

    } catch (error) {
      console.error(error);
      alert("Gagal koneksi ke server");
      this.$router.push("/login");
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.dashboard-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>
