export default function StatsCard({ icon, label, value, gradient }) {
    return (
        <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                <div className="text-white/90">
                    {icon}
                </div>
            </div>
        </div>
    );
}
