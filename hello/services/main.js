import express from 'express'

export default (req, res) => {
  return res.json({ msg: 'Hello Main' })
}