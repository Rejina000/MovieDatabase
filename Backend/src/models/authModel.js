import User from '../../data/user.js'
import bcrypt from 'bcrypt'

export async function register(userDetails) {
  return User.create(userDetails)
}

export async function login({ email, password }) {
  const user = await User.findOne({ email })
  if (!user) return null
  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}

export async function getUserById(userId) {
  return User.findById(userId)
}

export async function getWatchlist(userId) {
  return User.findById(userId).populate("watchlist")
}

export async function addToWatchlist(userId, movieId) {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { watchlist: movieId } },
    { new: true }
  )
}

export async function removeFromWatchlist(userId, movieId) {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { watchlist: movieId } },
    { new: true }
  )
}