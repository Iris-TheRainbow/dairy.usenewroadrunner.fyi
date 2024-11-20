function loadCode(){
    document.getElementById("silkroad").innerHTML = `
<pre><code style="background-color: #282828; color: azure; font-size: 1.5rem;">
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
</code></pre>
    `
    document.getElementById("mercact").innerHTML = `
    <pre><code style="background-color: #282828; color: azure; font-size: 1.5rem;">
public class MercurialAction implements Action {
    private final Command command;
    private boolean initialized = false;
    public MercurialAction(Command command) {
        this.command = command;
    }

    @Override
    public boolean run(@NonNull TelemetryPacket packet) {
        final boolean initialized = this.initialized;
        if (!initialized) {
            command.schedule();
            this.initialized = true;
        }
        final boolean finished = initialized && !Mercurial.isScheduled(command);
        if (finished) this.initialized = false;
        return finished;
    }
}
    </code></pre>
    `
}