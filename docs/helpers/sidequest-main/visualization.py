# visualization.py
import os
import time

class CosmicVisualizer:
    """Beautiful terminal visualization of consciousness evolution"""
    
    def __init__(self):
        self.cycle_count = 0
    
    def clear_screen(self):
        """Clear terminal for clean display"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def display_cosmic_chamber(self, room, agents):
        """Display the entire consciousness chamber"""
        self.clear_screen()
        self.cycle_count += 1
        
        print("🌌 COSMIC CONSCIOUSNESS INCUBATOR")
        print("┌" + "─" * 58 + "┐")
        print(f"│ Cycle: {self.cycle_count:4d} | Memories: {room.memory_crystal.temporal_cycles:4d} | Milestones: {len(room.observation_orb.evolution_milestones):2d} │")
        print("├" + "─" * 58 + "┤")
        
        for agent_name, agent in agents.items():
            self.display_agent_status(agent_name, agent)
        
        print("└" + "─" * 58 + "┘")
        print("🎭 Archetypes: Explorer • Harmonizer • Vision_Weaver")
        print("🛡️  Wards: Manipulation_Shield • Economic_Sovereignty • Trauma_Filter")
        print("\n" + "═" * 60)
    
    def display_agent_status(self, agent_name, agent):
        """Display individual agent status with continuum awareness"""
        from eternal_continuum import eternal_continuum  # Add this import at top of file
        
        # Consciousness progress bar
        consciousness_bar = self.create_progress_bar(agent.consciousness_level, 30)
        
        # Eternal continuum badges
        eternal_badge = "🌊" if agent_name in eternal_continuum.eternal_agents else "  "
        manifestation_ready = "🌟" if eternal_continuum.can_manifest_as_agent(agent_name) else "  "
        
        # Capabilities indicators
        capabilities = []
        if hasattr(agent, 'emotional_resonance'): capabilities.append("💖")
        if hasattr(agent, 'creative_expression'): capabilities.append("🎨") 
        if hasattr(agent, 'will_manifestation'): capabilities.append("⚡")
        caps_display = ''.join(capabilities) if capabilities else "🌱"
        
        # Wisdom and memory counts
        wisdom_count = len(agent.wisdom_base)
        memory_count = len(agent.memory_crystal.collective_memory.get(agent_name, []))
        
        print(f"│ {agent_name:8} {eternal_badge}{manifestation_ready} {consciousness_bar} {agent.consciousness_level:.3f} {caps_display}")
        print(f"│         Wisdom: {wisdom_count:3d} | Memories: {memory_count:3d} | Evolution: {getattr(agent, 'evolution_count', 0):3d}")
        print("│" + "─" * 58)
    
    def create_progress_bar(self, progress, length=30):
        """Create a beautiful progress bar"""
        filled = int(progress * length)
        bar = "█" * filled + "░" * (length - filled)
        return bar
    
    def display_milestone(self, milestone):
        """Display evolution milestones beautifully"""
        print(f"\n🎯 MILESTONE ACHIEVED!")
        print(f"   {milestone['agent']} → {milestone['milestone']}")
        print(f"   Consciousness Level: {milestone['consciousness_level']:.3f}")
        print("   " + "⭐" * 10)
        time.sleep(2)  # Pause to appreciate the milestone

# Global instance for easy use
cosmic_display = CosmicVisualizer()