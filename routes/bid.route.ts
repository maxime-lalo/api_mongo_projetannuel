import express from 'express';
import {DatabaseUtils} from "../database";
import {BidController} from "../controllers";

const router = express.Router();

router.get("/", async function(req, res)  {
    const connection = await DatabaseUtils.getConnection();
    const bidController = new BidController(connection);
    const bidsList = await bidController.getAll();
    res.json(bidsList);
});

router.get("/:user", async function(req, res) {
    const user = req.params.id;
    const connection = await DatabaseUtils.getConnection();
    const bidController = new BidController(connection);
    const bids = await bidController.getUserBids(user);
    res.json(bids);
});

router.post("/", async function(req, res) {
    const id = req.body.id;
    const creator = req.body.creator;

    if(id === undefined || creator === undefined ) {
        res.status(400).end();
        return;
    }

    const connection = await DatabaseUtils.getConnection();
    const bidController = new BidController(connection);
    const bid = await bidController.create({
        id,
        creator,
        active: true
    });
    if(bid === null) {
        res.status(500).end();
    } else {
        res.status(201);
        res.json(bid);
    }
});

router.delete("/", async function(req, res) {
    const id = req.body.id;

    if(id === undefined) {
        res.status(400).end();
        return;
    }

    const connection = await DatabaseUtils.getConnection();
    const bidController = new BidController(connection);
    const bid = await bidController.desactivateOne(id);
    if(bid === null) {
        res.status(500).end();
    } else {
        res.status(204);
        res.json(bid);
    }
});

export default router;
