public class SilkRoad implements Feature {
    private Dependency<?> dependency = new SingleAnnotation<>(org.firstinspires.ftc.teamcode.util.SilkRoad.Attach.class);
    private static FtcDashboard dash;
    private static Canvas canvas;
    private static Action actions;
    private static boolean run = true;
    @NonNull
    @Override
    public Dependency<?> getDependency() { return dependency; }

    @Override
    public void setDependency(@NonNull Dependency<?> dependency) {
        this.dependency = dependency;
    }

    private SilkRoad() {}

    public static final org.firstinspires.ftc.teamcode.util.SilkRoad INSTANCE = new org.firstinspires.ftc.teamcode.util.SilkRoad();


    @Override
    public void postUserInitLoopHook(@NotNull Wrapper opMode) {
        dash = FtcDashboard.getInstance();
        canvas = new Canvas();
    }

    @Override
    public void postUserLoopHook(@NotNull Wrapper opMode) {
        if (run && !Thread.currentThread().isInterrupted()) {
            TelemetryPacket packet = new TelemetryPacket();
            packet.fieldOverlay().getOperations().addAll(canvas.getOperations());

            run = actions.run(packet);

            dash.sendTelemetryPacket(packet);
        }
    }

    public static void RunAsync(Action actions){
        SilkRoad.actions = actions;
    }

    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    @Inherited
    public @interface Attach {}
}