import User from "../models/User.js";
import { Request, Response } from "express";
import Thought from "../models/Thought.js";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  };
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  };
};

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate({_id: req.params.thoughtId}, req.body, {new: true});
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    };
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });
    res.status(200).json(`Thought deleted: ${thought}`);
  } catch (err) {
    res.status(500).json(err);
  };
};

export const postReaction = async (req: Request, res: Response) => {
  try {
    const reaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true });
    res.status(200).json(`added: ${reaction}`);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const deletedReaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
    res.json(deletedReaction);
  } catch (err) {
    if (!res.headersSent) {
    res.json(err);
  }
}
}