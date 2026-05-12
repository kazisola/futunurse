import { useEffect, useRef, useState } from "react";

interface AiLoadingAnimationProps {
    isVisible: boolean;
    title?: string;
}

const COMPLETED_STEPS = [
    "Contraindications reviewed",
    "Built clinical summary…",
];

const PENDING_STEP = "Formatting & finalising card";

const ACTIVE_MESSAGES = [
    "Applying nursing protocols…",
    "Cross-referencing dosage guidelines…",
    "Compiling nursing care notes…",
];

const AiLoadingAnimation = ({
    isVisible,
    title = "Generating companion card",
}: AiLoadingAnimationProps) => {
    const [msgIndex, setMsgIndex] = useState(0);
    const [msgKey, setMsgKey] = useState(0);
    const [progress, setProgress] = useState(12);
    const msgInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const progInterval = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!isVisible) {
            setMsgIndex(0);
            setMsgKey(0);
            setProgress(12);
            return;
        }

        setMsgIndex(0);
        setMsgKey(0);
        setProgress(12);

        msgInterval.current = setInterval(() => {
            setMsgIndex((i) => (i + 1) % ACTIVE_MESSAGES.length);
            setMsgKey((k) => k + 1);
        }, 2000);

        progInterval.current = setInterval(() => {
            setProgress((p) => (p >= 92 ? p : p + Math.random() * 2.2));
        }, 350);

        return () => {
            clearInterval(msgInterval.current!);
            clearInterval(progInterval.current!);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const pct = Math.round(Math.min(progress, 93));

    return (
        <>
            <style>{`
        @keyframes _fn-overlay { from{opacity:0} to{opacity:1} }
        @keyframes _fn-card { from{opacity:0;transform:translateY(10px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes _fn-spin { to{stroke-dashoffset:0} }
        @keyframes _fn-dot { 0%,100%{opacity:.3;transform:scale(.75)} 50%{opacity:1;transform:scale(1)} }
        @keyframes _fn-msg { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes _fn-check { 0%{opacity:0;transform:scale(0)} 60%{transform:scale(1.2)} 100%{opacity:1;transform:scale(1)} }
      `}</style>

            {/* Backdrop */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Generating companion cards, please wait"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(15, 23, 42, 0.4)",
                    animation: "_fn-overlay 0.2s ease both",
                    padding: "1rem",
                }}
            >
                {/* Card */}
                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: 20,
                        border: "1px solid #e2e8f0",
                        padding: "2rem 1.75rem",
                        width: "100%",
                        maxWidth: 360,
                        boxShadow: "0 4px 24px rgba(15,23,42,0.08)",
                        animation: "_fn-card 0.4s cubic-bezier(0.22,1,0.36,1) both",
                    }}
                >
                    {/* ── Top: spinner + title ── */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            marginBottom: "1.75rem",
                        }}
                    >
                        <div style={{ position: "relative", width: 52, height: 52, marginBottom: "1rem" }}>
                            <svg
                                width="52"
                                height="52"
                                viewBox="0 0 52 52"
                                fill="none"
                                style={{ position: "absolute", inset: 0 }}
                                aria-hidden="true"
                            >
                                <circle cx="26" cy="26" r="22" stroke="#e2e8f0" strokeWidth="2.5" />
                                <circle
                                    cx="26"
                                    cy="26"
                                    r="22"
                                    stroke="#6366f1"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeDasharray="56 82"
                                    strokeDashoffset="138"
                                    style={{
                                        animation: "_fn-spin 1.4s cubic-bezier(0.6,0.05,0.4,0.95) infinite",
                                        transformOrigin: "center",
                                        transformBox: "fill-box" as React.CSSProperties["transformBox"],
                                    }}
                                />
                            </svg>
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {/* Heart + EKG icon */}
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    <path d="M3.22 12H9.5l1.5-3 2 4.5 1.5-3h3.27" />
                                </svg>
                            </div>
                        </div>

                        <p
                            style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: "#0f172a",
                                margin: "0 0 4px",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {title}
                        </p>
                        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                            Drug &amp; Lab Companion · Futunurse
                        </p>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: "#f1f5f9", marginBottom: "1.5rem" }} />

                    {/* ── Step list ── */}
                    <div style={{ display: "flex", flexDirection: "column" }}>

                        {/* Completed steps */}
                        {COMPLETED_STEPS.map((step, i) => (
                            <div
                                key={step}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 12,
                                    paddingBottom: 14,
                                }}
                            >
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                    <div
                                        style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: "50%",
                                            background: "#f0fdf4",
                                            border: "1.5px solid #bbf7d0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <svg
                                            width="11"
                                            height="11"
                                            viewBox="0 0 11 11"
                                            fill="none"
                                            aria-hidden="true"
                                            style={{ animation: `_fn-check 0.3s ${i * 0.08}s ease both` }}
                                        >
                                            <path
                                                d="M2 5.5l2.5 2.5L9 3"
                                                stroke="#16a34a"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    {/* Connector line */}
                                    <div style={{ width: 1.5, flex: 1, background: "#f1f5f9", marginTop: 4, minHeight: 14 }} />
                                </div>
                                <div style={{ paddingTop: 2 }}>
                                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, textDecoration: "line-through" }}>
                                        {step}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Active step — cycling messages */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 12,
                                paddingBottom: 14,
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                <div
                                    style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: "50%",
                                        background: "#eef2ff",
                                        border: "1.5px solid #c7d2fe",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 7,
                                            height: 7,
                                            borderRadius: "50%",
                                            background: "#6366f1",
                                            animation: "_fn-dot 1.1s ease-in-out infinite",
                                        }}
                                    />
                                </div>
                                {/* Connector line */}
                                <div style={{ width: 1.5, flex: 1, background: "#f1f5f9", marginTop: 4, minHeight: 14 }} />
                            </div>
                            <div style={{ paddingTop: 2 }}>
                                <p
                                    key={msgKey}
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 500,
                                        color: "#0f172a",
                                        margin: "0 0 2px",
                                        animation: "_fn-msg 0.3s ease both",
                                    }}
                                >
                                    {ACTIVE_MESSAGES[msgIndex]}
                                </p>
                                <p style={{ fontSize: 11, color: "#a5b4fc", margin: 0 }}>In progress</p>
                            </div>
                        </div>

                        {/* Pending step */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 12,
                                opacity: 0.35,
                            }}
                        >
                            <div
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: "50%",
                                    background: "#ffffff",
                                    border: "1.5px solid #e2e8f0",
                                    flexShrink: 0,
                                }}
                            />
                            <div style={{ paddingTop: 2 }}>
                                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                                    {PENDING_STEP}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Progress bar ── */}
                    <div style={{ marginTop: "1.5rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 6,
                            }}
                        >
                            <span style={{ fontSize: 11, color: "#94a3b8" }}>Progress</span>
                            <span style={{ fontSize: 11, color: "#6366f1", fontWeight: 500 }}>{pct}%</span>
                        </div>
                        <div style={{ height: 4, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
                            <div
                                style={{
                                    height: "100%",
                                    width: `${pct}%`,
                                    background: "linear-gradient(90deg, #818cf8, #6366f1)",
                                    borderRadius: 99,
                                    transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AiLoadingAnimation;