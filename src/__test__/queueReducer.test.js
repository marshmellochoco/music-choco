import { queueReducer } from "../Reducers/queueReducer";

describe("queueReducer test", () => {
    const initState = {
        queue: [],
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
            queueReducer(initState, {
                type: "SET_QUEUE",
                queue: testQueueData.map((qd) => {
                    return qd.songId;
                }),
            })
        ).toEqual({
            ...initState,
            queue: testQueueData.map((qd) => {
                return qd.songId;
            }),
        });
    });

    it("should handle ADD_QUEUE", () => {
        expect(
            queueReducer(initState, {
                type: "ADD_QUEUE",
                songId: "60b67fbcf747a945dcc5d284",
            })
        ).toEqual({ ...initState, queue: ["60b67fbcf747a945dcc5d284"] });
    });

    it("should handle SET_LOADING", () => {
        expect(
            queueReducer(initState, {
                type: "SET_LOADING",
                loading: false,
            })
        ).toEqual({ ...initState, loading: false });
    });

    it("should handle SET_QUEUE_DATA", () => {
        expect(
            queueReducer(initState, {
                type: "SET_QUEUE_DATA",
                queueData: testQueueData,
            })
        ).toEqual({ ...initState, queueData: testQueueData });
    });
});
