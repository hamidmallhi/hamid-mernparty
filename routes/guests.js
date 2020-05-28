const express = require('express')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const router = express.Router()
  
//Guest Model
const Guest = require('../models/Guest')

// @route Get /guests
// @des Get guests
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id })
    res.json(guests)
  } catch (err) {
    console.err(err.message) 
    res.status(500).send('Server Error')
  }
})

// @route POST /guests
// @des Add new guest
// @access Private

router.post('/',
  [
    auth,
    [
      check('name', 'Please provide name').not().isEmpty(),
      check('phone', 'Please provide phone').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }

    const { name, phone, dietary, isConfirmed } = req.body

    try {
      const newGuest = new Guest({
        user: req.user.id,
        name,
        phone,
        dietary,
        isConfirmed
      })
      const guest = await newGuest.save()

      res.json(guest)

    } catch (err) {

      console.error(err.message)
      res.status(500).send('server error')
    }
  })

// @route PUT /guests/:id
// @des update guest
// @access Private

router.put('/:id', auth, async (req, res) => {  
  const { name, phone, dietary, isConfirmed } = req.body

  // build Guest object 
  const guestFields = { name, phone, dietary, isConfirmed };

  try {
    let guest = await Guest.findById(req.params.id)
    if (!guest) return res.status(404).json({ msg: 'Guest not found' })
    // Make sure user owns the guest
    if (guest.user.toString() !== req.user.id) { 
      return res.status(401).json({ msg: 'Not authorized' })
    }
    guest = await Guest.findByIdAndUpdate(req.params.id, { $set: guestFields }, { new: true })
    res.send(guest)
  } catch (err) {
    console.errors(err.message)
    res.status(500).send('Server Error')
  }
})

// @route DELETE /guests/:id
// @des Delete a guest
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id)
    if (!guest) return res.status(404).json({ msg: 'Guest not found' })
    // check if user owns the guest 
    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }
    await Guest.findByIdAndRemove(req.params.id)    
    res.send('Guest Removed successfully')
  } catch (err) {
    console.errors(err.message).json('Server Error')
  }
})

module.exports = router 