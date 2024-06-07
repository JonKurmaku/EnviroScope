library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity Ethernet_Transmitter is
    Port (
        clk     : in STD_LOGIC;
        reset   : in STD_LOGIC;
        tx_data : in STD_LOGIC_VECTOR(39 downto 0);
        tx_busy : in STD_LOGIC;         -- Ethernet core busy signal
        tx_trigger : out STD_LOGIC      -- Signal to start transmission
    );
end Ethernet_Transmitter;

architecture Behavioral of Ethernet_Transmitter is
    constant CLOCK_FREQ : integer := 100000000;  -- Adjust to your clock frequency
    constant TIMER_LIMIT : integer := CLOCK_FREQ * 60;  -- 1 minute timer
    signal timer : integer range 0 to TIMER_LIMIT := 0;
begin
    process(clk, reset)
    begin
        if reset = '1' then
            timer <= 0;
            tx_trigger <= '0';
        elsif rising_edge(clk) then
            if timer < TIMER_LIMIT - 1 then
                timer <= timer + 1;
                tx_trigger <= '0';
            else
                timer <= 0;
                if tx_busy = '0' then
                    tx_trigger <= '1'; -- Trigger transmission
                end if;
            end if;
        end if;
    end process;
end Behavioral;
