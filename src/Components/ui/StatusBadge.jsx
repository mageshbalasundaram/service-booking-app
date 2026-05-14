import React from 'react'

const StatusBadge = ({ status }) => {

    const styles = {
        created: "bg-yellow-100 text-yellow-800",
        accepted: "bg-blue-100 text-blue-800",
        in_progress: "bg-orange-100 text-orange-800",
        completed: "bg-green-100 text-green-800"
    }

    const lables = {
        created: "⏳ Waiting for provider",
        accepted: "✅ Provider accepted",
        in_progress: "🔧 Work in progress",
        completed: "🎉 Completed",
    }

    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}>
            {labels[status] || status}

        </span>
    )
}

export default StatusBadge