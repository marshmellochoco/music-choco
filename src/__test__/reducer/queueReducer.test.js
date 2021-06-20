import { queueReducer } from "../../store/reducers/queueReducer";
import {
    addQueue,
    setLoading,
    setQueue,
    setQueueData,
} from "../../store/actions/queueAction";

describe("queueReducer test", () => {
    const initState = {
        queue: [],
        randomQueue: [],
        queueData: [],
        loading: false,
    };
    const testQueueData = [
        {
            songId: "60b67f66f747a945dcc5d27c",
            title: "To the Moon - Main Theme",
            duration: 296,
            albumname: "To the Moon (Original Soundtrack)",
            albumId: "60b67f1ff747a945dcc5d27b",
            artist: "Kan Gao",
        },
        {
            songId: "60b67fb1f747a945dcc5d282",
            title: "For River - Piano (Sarah & Tommy's Version)",
            duration: 178,
            albumname: "To the Moon (Original Soundtrack)",
            albumId: "60b67f1ff747a945dcc5d27b",
            artist: "Kan Gao",
        },
    ];

    it("should return initial state", () => {
        expect(queueReducer(undefined, {})).toEqual(initState);
    });

    it("should handle SET_QUEUE", () => {
        expect(
            queueReducer(
                initState,
                setQueue(
                    testQueueData.map((qd) => {
                        return qd.songId;
                    })
                )
            ).queue
        ).toEqual(
            testQueueData.map((qd) => {
                return qd.songId;
            })
        );
    });

    // TODO: Test SET_QUEUE will handle non array value
    // TODO: Test SET_QUEUE will handle non Array<string> value

    it("should handle ADD_QUEUE", () => {
        expect(
            queueReducer(initState, addQueue("60b67fbcf747a945dcc5d284")).queue
        ).toEqual(["60b67fbcf747a945dcc5d284"]);
    });

    // TODO: Test ADD_QUEUE will handle non string value

    it("should NOT add repeating song to queue", () => {
        const queueState = {
            queue: ["60b67fbcf747a945dcc5d284", "60b67fb1f747a945dcc5d282"],
            queueData: [],
            loading: false,
        };

        expect(
            queueReducer(queueState, addQueue("60b67fbcf747a945dcc5d284")).queue
        ).toEqual(queueState.queue);
    });

    it("should handle SET_LOADING", () => {
        expect(queueReducer(initState, setLoading(false))).toEqual({
            ...initState,
            loading: false,
        });
    });

    // TODO: Test SET_LOADING can handle non boolean value

    it("should handle SET_QUEUE_DATA", () => {
        expect(queueReducer(initState, setQueueData(testQueueData))).toEqual({
            ...initState,
            queueData: testQueueData,
        });
    });

    // TODO: Test SET_QUEUE_DATA can handle object without the required field
});
