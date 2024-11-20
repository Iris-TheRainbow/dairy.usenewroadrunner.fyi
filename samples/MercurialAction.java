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