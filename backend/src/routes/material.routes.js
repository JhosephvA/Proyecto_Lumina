const express = require("express");
const router = express.Router();
const { createMaterial, getMaterials } = require("../controllers/material.controller");
const { requireAuth, requireRole } = require("../middlewares/auth.middleware");
const config = require("../config/config");

// 🔐 Middleware de profesor
router.use(requireAuth, requireRole([config.roles.PROFESSOR]));

// POST crear material
router.post("/", createMaterial);

// GET listar materiales
router.get("/", getMaterials);

module.exports = router;
